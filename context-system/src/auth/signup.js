import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export const signupUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // Save user in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: serverTimestamp(),
  });

  return user;
};
