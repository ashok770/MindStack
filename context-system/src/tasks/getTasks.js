import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function getUserTasks() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const q = query(collection(db, "tasks"), where("userId", "==", user.uid));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
