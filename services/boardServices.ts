import { useBoardStore, useUserStore } from "@/stores";
import { BoardData } from "@/types";
import { db } from "./firebase.config";
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";

const user = useUserStore.getState().user;

export async function createBoard(data: BoardData) {
  if (!user || !user.uid) throw new Error("User not logged in");

  try {
    const docRef = await addDoc(collection(db, "boards"), {
      ...data,
      createdAt: serverTimestamp(),
      uid: user.uid,
    });

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      boards: arrayUnion(docRef.id),
    });

    const newBoard: BoardData = {
      ...data,
      id: docRef.id,
      createdAt: new Date(),
    };
    useBoardStore.getState().setBoard(newBoard);

    return docRef.id;
  } catch (err) {
    console.error("Error creating board:", err);
    throw err;
  }
}

// export async function readBoard(id: string) {
//   const snapshot = await getDoc(doc(db, "boards", id));
//   return snapshot.exists() ? snapshot.data() : null;
// }
//
// export async function updateBoard(id: string, data: Partial<any>) {
//   await updateDoc(doc(db, "boards", id), data);
// }
//
// export async function deleteBoard(id: string) {
//   await deleteDoc(doc(db, "boards", id));
// }
