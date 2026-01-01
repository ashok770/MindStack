import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export const addTask = async (title, contextNotes) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  await addDoc(collection(db, "tasks"), {
    userId: user.uid,
    title,
    contextNotes,
    lastUpdated: serverTimestamp(),
  });
};
