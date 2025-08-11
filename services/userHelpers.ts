import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.config";
import { useUserStore } from "@/stores/";

export async function fetchAndStoreUserData(uid: string) {
  try {
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
      console.log(
        "%cDone fetching user data",
        "color: white; background: #0A400C; padding: 2px 6px; border-radius: 4px",
      );
    } else {
      console.warn("User document not found.");
    }
  } catch (error) {
    console.error("Error fetching user data", error);
  }
}
