import useCardStore from "@/stores/cardStore";
import { ListData } from "@/types";
import { create } from "zustand";
import {
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  query,
  where,
  Unsubscribe,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "@/services/firebase.config";

interface ListStore {
  lists: ListData[];
  list: ListData | null;
  loading: boolean;
  unsubscribeLists?: () => void;

  setList: (list: ListData) => void;
  setLists: (lists: ListData[]) => void;
  fetchListsRealtime: (boardId: string) => Unsubscribe | undefined;
  createList: (name: string, boardId: string) => Promise<string | null>;
  updateList: (id: string, updates: Partial<ListData>) => Promise<void>;
  deleteList: (id: string, boardId: string) => Promise<void>;
  clearList: () => void;
}

const useListStore = create<ListStore>((set, get) => ({
  lists: [],
  list: null,
  loading: true,

  setList: (list) => set({ list }),

  setLists: (lists) => set({ lists }),

  fetchListsRealtime: (boardId: string) => {
    const fetchCardsRealtime = useCardStore.getState().fetchCardsRealtime;
    const user = auth.currentUser;
    if (!user) {
      console.log(
        "%cError: fetchListsRealtime: Not authenticated",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
      );
      return;
    }

    const prevUnsub = get().unsubscribeLists;
    if (prevUnsub) prevUnsub();

    const q = query(
      collection(db, "lists"),
      where("boardId", "==", boardId),
      orderBy("position", "asc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const lists = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
          } as ListData;
        });

        if (lists && lists.length > 0) {
          lists
            .filter((list) => !!list.id)
            .forEach((list) => fetchCardsRealtime(list.id!));
        }
        set({ lists, loading: false });
      },
      (err) => {
        console.log(
          "%cError: fetchListsRealtime",
          "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
          err,
        );
      },
    );
    set({ unsubscribeLists: unsubscribe });
    return unsubscribe;
  },

  createList: async (name, boardId) => {
    if (!boardId?.trim()) {
      throw new Error("Board ID is required");
    }
    if (!name?.trim()) {
      throw new Error("List name is required");
    }
    const listsLength = get().lists.length;
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log(
          "%cError: createList: Not authenticated",
          "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        );
        return null;
      }

      const newListRef = await addDoc(collection(db, "lists"), {
        boardId: boardId,
        name,
        cards: [],
        position: listsLength,
      });

      await updateDoc(newListRef, {
        id: newListRef.id,
      });
      if (boardId) {
        await updateDoc(doc(db, "boards", boardId), {
          lists: arrayUnion(newListRef.id),
        });
      }

      return newListRef.id;
    } catch (err) {
      console.log(
        "%cError: createList",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        err,
      );
      return null;
    }
  },

  updateList: async (id, updates) => {
    try {
      const docRef = doc(db, "lists", id);
      await updateDoc(docRef, {
        ...updates,
      });
    } catch (err) {
      console.log(
        "%cError: updateList",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        err,
      );
    }
  },

  deleteList: async (id, boardId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log(
          "%cError: deleteList: Not authenticated",
          "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        );
        return;
      }

      await deleteDoc(doc(db, "lists", id));
      await updateDoc(doc(db, "boards", boardId), {
        lists: arrayRemove(id),
      });
    } catch (err) {
      console.log(
        "%cError: deleteList",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        err,
      );
    }
  },

  clearList: () => set({ list: null }),
}));

export default useListStore;
