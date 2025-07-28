import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase.config";
import { doc, setDoc } from "firebase/firestore";

export async function registerUser(
  email: string,
  password: string,
  name: string,
) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", result.user.uid), {
    name,
    email: result.user.email,
    uid: result.user.uid,
  });
  return result.user;
}

export async function loginUser(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function logoutUser() {
  await signOut(auth);
}
