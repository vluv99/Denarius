import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { PaymentMethod } from "../models/PaymentMethodModel";

const CARD_COLLECTION_NAME = "card"; //TODO: rename collection name to "paymentMethod"

export function useGetPaymentMethodData() {
  const [card, setCardData] = useState<PaymentMethod[]>([]);
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
