import { app } from "@/config/conn";
import {
  getFirestore,
  addDoc,
  collection,
  doc as clientDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const DEMO_BOOKINGS_COLLECTION = "demo_bookings";
export const DEMO_BOOKING_LOCKS_COLLECTION = "demo_booking_slot_locks";
export const DEMO_AVAILABILITY_EXCLUSIONS_COLLECTION =
  "demo_availability_exclusions";
export const DEMO_MEETING_DURATION_MINUTES = 30;
export const DEMO_BREAK_DURATION_MINUTES = 30;
export const DEMO_SLOT_DURATION_MINUTES =
  DEMO_MEETING_DURATION_MINUTES + DEMO_BREAK_DURATION_MINUTES;
export const DEMO_MEETING_DURATION_MS =
  DEMO_MEETING_DURATION_MINUTES * 60 * 1000;
export const DEMO_SLOT_DURATION_MS = DEMO_SLOT_DURATION_MINUTES * 60 * 1000;
const DEMO_SLOT_LOCK_INTERVAL_MS = 15 * 60 * 1000;

export class DemoSlotUnavailableError extends Error {
  constructor() {
    super(
      "That demo time has already been booked. Please select another time.",
    );
    this.name = "DemoSlotUnavailableError";
  }
}

export type DemoBookingWindow = {
  id: string;
  startAtMs: number;
  endAtMs: number;
  startAtIso: string;
  endAtIso: string;
  demoDateTime?: string;
  bookingStatus?: string;
};

export type DemoAvailabilityExclusion = {
  id: string;
  active: boolean;
  scope: "weekly" | "date";
  weekday?: number;
  date?: string;
  allDay: boolean;
  startTime?: string;
  endTime?: string;
  reason?: string;
};

const stripUndefinedValue = (value: unknown): unknown => {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => stripUndefinedValue(item))
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .map(([key, nestedValue]) => [key, stripUndefinedValue(nestedValue)])
        .filter(([, nestedValue]) => nestedValue !== undefined),
    );
  }

  return value;
};

const stripUndefinedValues = (data: Record<string, unknown>) =>
  stripUndefinedValue(data) as Record<string, unknown>;

const getDemoSlotId = (startAtMs: number) => `demo_${startAtMs}`;

const getDemoSlotLockIds = (startAtMs: number, endAtMs: number) => {
  const lockIds: string[] = [];
  const firstLockAtMs =
    Math.floor(startAtMs / DEMO_SLOT_LOCK_INTERVAL_MS) *
    DEMO_SLOT_LOCK_INTERVAL_MS;

  for (
    let lockAtMs = firstLockAtMs;
    lockAtMs < endAtMs;
    lockAtMs += DEMO_SLOT_LOCK_INTERVAL_MS
  ) {
    lockIds.push(`lock_${lockAtMs}`);
  }

  return lockIds;
};

const isDemoBookingWindow = (
  booking: DemoBookingWindow | null,
): booking is DemoBookingWindow => Boolean(booking);

const normalizeDemoBookingWindow = (
  id: string,
  data: Record<string, unknown>,
): DemoBookingWindow | null => {
  const startAtMs =
    typeof data.start_at_ms === "number"
      ? data.start_at_ms
      : Date.parse(String(data.demo_start_at_iso || ""));
  const endAtMs =
    typeof data.end_at_ms === "number"
      ? data.end_at_ms
      : startAtMs + DEMO_SLOT_DURATION_MS;

  if (!Number.isFinite(startAtMs) || !Number.isFinite(endAtMs)) {
    return null;
  }

  const bookingStatus =
    typeof data.booking_status === "string" ? data.booking_status : "booked";

  if (["cancelled", "canceled"].includes(bookingStatus.toLowerCase())) {
    return null;
  }

  return {
    id,
    startAtMs,
    endAtMs,
    startAtIso:
      typeof data.demo_start_at_iso === "string"
        ? data.demo_start_at_iso
        : new Date(startAtMs).toISOString(),
    endAtIso:
      typeof data.demo_end_at_iso === "string"
        ? data.demo_end_at_iso
        : new Date(endAtMs).toISOString(),
    demoDateTime:
      typeof data.demo_date_time === "string" ? data.demo_date_time : undefined,
    bookingStatus,
  };
};

const defaultDemoAvailabilityExclusions: DemoAvailabilityExclusion[] = [
  {
    id: "default_sunday",
    active: true,
    scope: "weekly",
    weekday: 0,
    allDay: true,
    reason: "Sunday",
  },
];

const normalizeDemoAvailabilityExclusion = (
  id: string,
  data: Record<string, unknown>,
): DemoAvailabilityExclusion | null => {
  const active = data.active !== false;
  const scope = data.scope === "date" ? "date" : "weekly";
  const weekday =
    typeof data.weekday === "number"
      ? data.weekday
      : typeof data.day_of_week === "number"
        ? data.day_of_week
        : undefined;
  const date = typeof data.date === "string" ? data.date : undefined;
  const allDay = data.all_day === true || data.allDay === true;
  const startTime =
    typeof data.start_time === "string"
      ? data.start_time
      : typeof data.startTime === "string"
        ? data.startTime
        : undefined;
  const endTime =
    typeof data.end_time === "string"
      ? data.end_time
      : typeof data.endTime === "string"
        ? data.endTime
        : undefined;

  if (!active) {
    return null;
  }

  if (scope === "weekly" && typeof weekday !== "number") {
    return null;
  }

  if (scope === "date" && !date) {
    return null;
  }

  if (!allDay && (!startTime || !endTime)) {
    return null;
  }

  return {
    id,
    active,
    scope,
    weekday,
    date,
    allDay,
    startTime,
    endTime,
    reason: typeof data.reason === "string" ? data.reason : undefined,
  };
};

export const addData = async (
  data: Record<string, unknown>,
  collectionName = "messages",
  options: { requireAdmin?: boolean } = {},
) => {
  const cleanData = stripUndefinedValues(data);
  const db = getFirestore(app);
  const docRef = await addDoc(collection(db, collectionName), {
    ...cleanData,
    created_at: serverTimestamp(),
  });

  return docRef.id;
};

export const getDataDoc = async (
  collectionName: string,
  docId: string,
  options: { requireAdmin?: boolean } = {},
) => {
  const db = getFirestore(app);

  const snapshot = await getDoc(clientDoc(db, collectionName, docId));
  return snapshot.exists() ? snapshot.data() : null;
};

export const setDataDoc = async (
  collectionName: string,
  docId: string,
  data: Record<string, unknown>,
  options: { merge?: boolean; requireAdmin?: boolean } = {},
) => {
  const cleanData = stripUndefinedValues(data);
  const db = getFirestore(app);

  await setDoc(
    clientDoc(db, collectionName, docId),
    {
      ...cleanData,
      updated_at: serverTimestamp(),
    },
    { merge: options.merge ?? true },
  );

  return docId;
};


export const reserveDemoBooking = async (
  data: Record<string, unknown> & {
    start_at_ms: number;
    end_at_ms: number;
  },
) => {
  if (!Number.isFinite(data.start_at_ms) || !Number.isFinite(data.end_at_ms)) {
    throw new Error("A valid demo start and end time is required.");
  }

  const docId = getDemoSlotId(data.start_at_ms);
  const slotLockIds = getDemoSlotLockIds(data.start_at_ms, data.end_at_ms);
  const cleanData = stripUndefinedValues({
    ...data,
    booking_status: data.booking_status || "booked",
    duration_minutes: DEMO_MEETING_DURATION_MINUTES,
    break_duration_minutes: DEMO_BREAK_DURATION_MINUTES,
    blocked_window_minutes: DEMO_SLOT_DURATION_MINUTES,
    slot_id: docId,
  });

  const db = getFirestore(app);
  const docRef = clientDoc(db, DEMO_BOOKINGS_COLLECTION, docId);
  const lockRefs = slotLockIds.map((lockId) =>
    clientDoc(db, DEMO_BOOKING_LOCKS_COLLECTION, lockId),
  );

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(docRef);
    const lockSnapshots = await Promise.all(
      lockRefs.map((lockRef) => transaction.get(lockRef)),
    );

    if (snapshot.exists() || lockSnapshots.some((lock) => lock.exists())) {
      throw new DemoSlotUnavailableError();
    }

    transaction.set(docRef, {
      ...cleanData,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });

    lockRefs.forEach((lockRef) => {
      transaction.set(lockRef, {
        booking_id: docId,
        start_at_ms: data.start_at_ms,
        end_at_ms: data.end_at_ms,
        created_at: serverTimestamp(),
      });
    });
  });

  return docId;
};

export const releaseDemoBooking = async (
  startAtMs: number,
  endAtMs: number,
) => {
  if (!Number.isFinite(startAtMs) || !Number.isFinite(endAtMs)) {
    return;
  }

  const docId = getDemoSlotId(startAtMs);
  const slotLockIds = getDemoSlotLockIds(startAtMs, endAtMs);
  const db = getFirestore(app);
  const docRef = clientDoc(db, DEMO_BOOKINGS_COLLECTION, docId);
  const lockRefs = slotLockIds.map((lockId) =>
    clientDoc(db, DEMO_BOOKING_LOCKS_COLLECTION, lockId),
  );

  await runTransaction(db, async (transaction) => {
    transaction.delete(docRef);
    lockRefs.forEach((lockRef) => transaction.delete(lockRef));
  });
};

export const updateDemoBooking = async (
  docId: string,
  data: Record<string, unknown>,
) => {
  const cleanData = stripUndefinedValues(data);
  const db = getFirestore(app);

  await updateDoc(clientDoc(db, DEMO_BOOKINGS_COLLECTION, docId), {
    ...cleanData,
    updated_at: serverTimestamp(),
  });
};

export const listDemoBookingsInRange = async (
  startAtMs: number,
  endAtMs: number,
) => {
  const db = getFirestore(app);
  const bookingsQuery = query(
    collection(db, DEMO_BOOKINGS_COLLECTION),
    where("start_at_ms", "<", endAtMs),
    orderBy("start_at_ms", "asc"),
  );
  const snapshot = await getDocs(bookingsQuery);

  const bookings = snapshot.docs
    .map((doc) => normalizeDemoBookingWindow(doc.id, doc.data()))
    .filter(isDemoBookingWindow);

  return bookings.filter((booking) => booking.endAtMs > startAtMs);
};

export const listDemoAvailabilityExclusions = async () => {
  const db = getFirestore(app);
  const exclusionsQuery = query(
    collection(db, DEMO_AVAILABILITY_EXCLUSIONS_COLLECTION),
    where("active", "==", true),
  );
  const snapshot = await getDocs(exclusionsQuery);
  const exclusions = snapshot.docs
    .map((doc) => normalizeDemoAvailabilityExclusion(doc.id, doc.data()))
    .filter((exclusion): exclusion is DemoAvailabilityExclusion =>
      Boolean(exclusion),
    );

  return [...defaultDemoAvailabilityExclusions, ...exclusions];
};
