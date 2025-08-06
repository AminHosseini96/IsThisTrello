import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useUserStore } from "@/stores/userStore";

interface login {
  email: string;
  password: string;
}

interface signUp extends login {
  name: string;
  avatar: string;
  boards: Array<object>;
}

export async function registerUser({
  email,
  password,
  name,
  avatar,
  boards,
}: signUp) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", result.user.uid), {
    name,
    email: result.user.email,
    uid: result.user.uid,
    avatar,
    boards,
  });
  return result.user;
}

export async function loginUser({ email, password }: login) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function logoutUser() {
  try {
    await signOut(auth);
    useUserStore.getState().clearUser();
    console.log("User successfully logged out and store cleared.");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
