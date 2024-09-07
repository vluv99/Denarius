import { collection, addDoc } from "firebase/firestore";
import {db, TRANSACTION_COLLECTION_NAME} from "../utils/firebase";
import { Dispatch, SetStateAction, useEffect } from "react";

type Transaction = {
  id: string;
  date: Date;
  payee: string;
  category: string;
  description?: string | null;
  amount: number;
  user: string;
  isCommon: boolean;
  cardType: string;
  creationDate?: Date | null;
};


export async function useAddTransactionData(
  t: Transaction,
  setStateCleared: () => void,
) {
  const action = await addDoc(collection(db, TRANSACTION_COLLECTION_NAME), t)
    .then(() => setStateCleared())
    .then(() => console.log("Transaction successfully added!"))
    .catch((e) => {
      console.log("Unsuccessful", e);
    });
}
