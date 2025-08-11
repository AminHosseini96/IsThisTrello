import { BoardData } from "@/types";
import { create } from "zustand";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  addDoc,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "@/services/firebase.config";

interface BoardStore {
  board: BoardData | null;
  loading: boolean;
  error: string | null;

  setBoard: (board: BoardData) => void;
  fetchBoard: (id: string) => Promise<void>;
  createBoard: (name: string, color: string) => Promise<string | null>;
  updateBoard: (id: string, updates: Partial<BoardData>) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  clearBoard: () => void;
}

const useBoardStore = create<BoardStore>((set) => ({
  board: null,
  loading: false,
  error: null,

  setBoard: (board) => set({ board }),

  fetchBoard: async (id) => {
    set({ loading: true, error: null });
    try {
      const docRef = doc(db, "boards", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        set({
          board: {
            id: snapshot.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
          } as BoardData,
        });
      } else {
        set({ error: "Board not found" });
      }
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  createBoard: async (name, color) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const newBoardRef = await addDoc(collection(db, "boards"), {
        userId: user.uid,
        name,
        color,
        createdAt: serverTimestamp(),
        lists: [],
      });

      await updateDoc(doc(db, "users", user.uid), {
        boards: arrayUnion(newBoardRef.id),
      });

      return newBoardRef.id;
    } catch (err: any) {
      set({ error: err.message });
      return null;
    }
  },

  updateBoard: async (id, updates) => {
    try {
      const docRef = doc(db, "boards", id);
      await updateDoc(docRef, updates);
      set((state) =>
        state.board?.id === id
          ? { board: { ...state.board, ...updates } as BoardData }
          : state,
      );
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  deleteBoard: async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      await deleteDoc(doc(db, "boards", id));
      await updateDoc(doc(db, "users", user.uid), {
        boards: arrayRemove(id),
      });

      set((state) => (state.board?.id === id ? { board: null } : state));
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  clearBoard: () => set({ board: null }),
}));

export default useBoardStore;
