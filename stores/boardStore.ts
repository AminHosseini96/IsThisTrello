import { BoardData } from "@/types";
import { create } from "zustand";
import {
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  addDoc,
  collection,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  query,
  where,
  Unsubscribe,
} from "firebase/firestore";
import { db, auth } from "@/services/firebase.config";

interface BoardStore {
  boards: BoardData[];
  board: BoardData | null;
  loading: boolean;
  unsubscribeBoards?: () => void;

  setBoard: (board: BoardData) => void;
  fetchBoardsRealtime: () => Unsubscribe | undefined;
  createBoard: (name: string, color: string) => Promise<string | null>;
  updateBoard: (id: string, updates: Partial<BoardData>) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  clearBoard: () => void;
}

const useBoardStore = create<BoardStore>((set, get) => ({
  boards: [],
  board: null,
  loading: true,

  setBoard: (board) => set({ board }),

  fetchBoardsRealtime: () => {
    const user = auth.currentUser;
    if (!user) {
      console.log(
        "%cError: fetchBoardsRealtime: Not authenticated",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
      );
      return;
    }

    const prevUnsub = get().unsubscribeBoards;
    if (prevUnsub) prevUnsub();

    const q = query(collection(db, "boards"), where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const boards = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            lastUpdatedAt: data.lastUpdatedAt?.toDate?.() || new Date(),
          } as BoardData;
        });

        set({ boards, loading: false });
      },
      (err) => {
        console.log(
          "%cError: fetchBoardsRealtime",
          "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
          err,
        );
      },
    );

    set({ unsubscribeBoards: unsubscribe });
    return unsubscribe;
  },

  createBoard: async (name, color) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log(
          "%cError: createBoard: Not authenticated",
          "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        );
        return null;
      }

      const newBoardRef = await addDoc(collection(db, "boards"), {
        uid: user.uid,
        name,
        color,
        createdAt: serverTimestamp(),
        lastUpdatedAt: serverTimestamp(),
        lists: [],
      });

      await updateDoc(newBoardRef, {
        id: newBoardRef.id,
      });

      await updateDoc(doc(db, "users", user.uid), {
        boards: arrayUnion(newBoardRef.id),
      });

      return newBoardRef.id;
    } catch (err) {
      console.log(
        "%cError: createBoard",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        err,
      );
      return null;
    }
  },

  updateBoard: async (id, updates) => {
    try {
      const docRef = doc(db, "boards", id);
      await updateDoc(docRef, {
        ...updates,
        lastUpdatedAt: serverTimestamp(),
      });
      set((state) => ({
        board: {
          ...state.board,
          ...updates,
          lastUpdatedAt: new Date(),
        },
      }));
    } catch (err) {
      console.log(
        "%cError: updateBoard",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        err,
      );
    }
  },

  deleteBoard: async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log(
          "%cError: deleteBoard: Not authenticated",
          "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        );
        return;
      }

      await deleteDoc(doc(db, "boards", id));
      await updateDoc(doc(db, "users", user.uid), {
        boards: arrayRemove(id),
      });
    } catch (err) {
      console.log(
        "%cError: deleteBoard",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        err,
      );
    }
  },

  clearBoard: () => set({ board: null }),
}));

export default useBoardStore;
