import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.config";
import { useUserStore } from "@/stores/userStore";

export async function fetchAndStoreUserData(uid: string) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    useUserStore.getState().setUser({
      uid,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      boards: userData.boards || [],
    });
    console.log("Done fetching user data");
  } else {
    console.warn("User document not found.");
  }
}
