import { CardData } from "@/types";
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

interface CardStore {
  cards: CardData[];
  card: CardData | null;
  loading: boolean;
  unsubscribeCards?: () => void;

  setCard: (card: CardData) => void;
  fetchCardsRealtime: (listId: string) => Unsubscribe | undefined;
  createCard: (name: string, listId: string) => Promise<string | null>;
  updateCard: (id: string, updates: Partial<CardData>) => Promise<void>;
  deleteCard: (id: string, listId: string) => Promise<void>;
  clearCard: () => void;
}

const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  card: null,
  loading: true,

  setCard: (card) => set({ card }),

  fetchCardsRealtime: (listId) => {
    const user = auth.currentUser;
    if (!user) {
      console.log(
        "%cError: fetchCardsRealtime: Not authenticated",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
      );
      return;
    }

    const prevUnsub = get().unsubscribeCards;
    if (prevUnsub) prevUnsub();

    const q = query(
      collection(db, "cards"),
      where("listId", "==", listId),
      orderBy("position", "asc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const cards = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
          } as CardData;
        });

        set({ cards, loading: false });
      },
      (err) => {
        console.log(
          "%cError: fetchCardsRealtime",
          "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
          err,
        );
      },
    );

    set({ unsubscribeCards: unsubscribe });
    return unsubscribe;
  },

  createCard: async (name, listId) => {
    if (!listId?.trim()) {
      throw new Error("List ID is required");
    }
    if (!name?.trim()) {
      throw new Error("Card name is required");
    }
    const cardsLength = get().cards.length;
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log(
          "%cError: createCard: Not authenticated",
          "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        );
        return null;
      }

      const newCardRef = await addDoc(collection(db, "cards"), {
        listId: listId,
        name,
        cards: [],
        position: cardsLength,
      });

      await updateDoc(newCardRef, {
        id: newCardRef.id,
      });
      if (listId) {
        await updateDoc(doc(db, "lists", listId), {
          cards: arrayUnion(newCardRef.id),
        });
      }

      return newCardRef.id;
    } catch (err) {
      console.log(
        "%cError: createCard",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        err,
      );
      return null;
    }
  },

  updateCard: async (id, updates) => {
    try {
      const docRef = doc(db, "cards", id);
      await updateDoc(docRef, {
        ...updates,
      });
    } catch (err) {
      console.log(
        "%cError: updateCard",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        err,
      );
    }
  },

  deleteCard: async (id, listId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log(
          "%cError: deleteCard: Not authenticated",
          "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        );
        return;
      }

      await deleteDoc(doc(db, "cards", id));
      await updateDoc(doc(db, "lists", listId), {
        cards: arrayRemove(id),
      });
    } catch (err) {
      console.log(
        "%cError: deleteCard",
        "color: white; background: #cc0000; padding: 2px 6px; border-radius: 4px",
        err,
      );
    }
  },

  clearCard: () => set({ card: null }),
}));

export default useCardStore;
