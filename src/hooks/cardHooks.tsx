import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

type Card = {
  id: string;
  name: string;
};

const CARD_COLLECTION_NAME = "card";

export function useGetCardData() {
  const [card, setCardData] = useState<Card[]>([]);
  const docRef = collection(db, CARD_COLLECTION_NAME);

  useEffect(() => {
    // onSnapshot so we can get data update real-time
    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      const card = querySnapshot.docs.map((doc) => {
        const data = doc.data(); // return data compatible with data types specified
        return {
          name: data.name,
          id: doc.id,
        };
      });
      setCardData(card);
      console.log(card);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return card;
}
