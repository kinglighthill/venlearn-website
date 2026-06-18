import {
  applicationDefault,
  cert,
  getApps,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import {
  FieldValue,
  getFirestore as getAdminFirestore,
} from "firebase-admin/firestore";
import { app } from "@/config/conn";
import {
  addDoc,
  collection,
  getFirestore as getClientFirestore,
  serverTimestamp,
} from "firebase/firestore";

const stripUndefinedValues = (data: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  );

const firebaseProjectId =
  process.env.FIREBASE_PROJECT_ID || "venlearn-staging";

const normalizePrivateKey = (privateKey: string) =>
  privateKey.replace(/\\n/g, "\n");

const getServiceAccountJson = () => {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!serviceAccountJson) {
    return null;
  }

  const serviceAccount = JSON.parse(serviceAccountJson) as {
    client_email?: string;
    private_key?: string;
    project_id?: string;
  };

  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_JSON must include client_email and private_key.",
    );
  }

  return {
    clientEmail: serviceAccount.client_email,
    privateKey: normalizePrivateKey(serviceAccount.private_key),
    projectId: serviceAccount.project_id || firebaseProjectId,
  };
};

const getServiceAccountEnv = () => {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return null;
  }

  return {
    clientEmail,
    privateKey: normalizePrivateKey(privateKey),
    projectId: firebaseProjectId,
  };
};

const getAdminDb = () => {
  const serviceAccount = getServiceAccountJson() || getServiceAccountEnv();
  const hasApplicationDefault = Boolean(
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
  );

  if (!serviceAccount && !hasApplicationDefault) {
    return null;
  }

  if (!getApps().length) {
    initializeAdminApp({
      credential: serviceAccount
        ? cert(serviceAccount)
        : applicationDefault(),
      projectId: serviceAccount?.projectId || firebaseProjectId,
    });
  }

  return getAdminFirestore();
};

export const hasFirestoreAdminCredentials = () =>
  Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY),
  );

export const addData = async (
  data: Record<string, unknown>,
  collectionName = "messages",
  options: { requireAdmin?: boolean } = {},
) => {
  const cleanData = stripUndefinedValues(data);
  const adminDb = getAdminDb();

  if (adminDb) {
    const docRef = await adminDb.collection(collectionName).add({
      ...cleanData,
      created_at: FieldValue.serverTimestamp(),
    });

    return docRef.id;
  }

  if (options.requireAdmin) {
    throw new Error(
      "Firebase Admin credentials are required for this Firestore write. Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.",
    );
  }

  const db = getClientFirestore(app);
  const docRef = await addDoc(collection(db, collectionName), {
    ...cleanData,
    created_at: serverTimestamp(),
  });

  return docRef.id;
};
