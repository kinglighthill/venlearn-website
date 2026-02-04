
import { app } from "@/config/conn";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

export const addData = async (data: any) => {
    const db = getFirestore(app)
    await addDoc(collection(db, "messages"), { ...data, created_at: serverTimestamp() })
};