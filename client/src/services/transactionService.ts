import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { Transaction } from "../models/Transaction";
import { User } from "../models/UserModel";
import { useUserContext } from "../contexts/DBContexts";

const TRANSACTION_COLLECTION_NAME = "transaction";

export async function addTransaction(data: Transaction, currentUser: User) {
  console.log("addTransaction");

  try {
    await addDoc(
      collection(db, TRANSACTION_COLLECTION_NAME),
      data.toDatabaseFormat(currentUser),
    );
  } catch (e) {
    console.error(e);
    throw e;
  }

  return data;
}

// TODO: look into lazy loading
export function getTransactionsOfUser(
  currentUser: User,
  callback: (t: Transaction[]) => void,
) {
  console.log("useTransactionsOfUser");

  const transactionQuery = query(
    collection(db, TRANSACTION_COLLECTION_NAME),
    where("user", "==", currentUser.userId),
    orderBy("date", "desc"),
    // limit(2) // limit the amount of documents it will return
  );

  const unsub = onSnapshot(transactionQuery, (querySnapshot) => {
    const result: Transaction[] = [];
    querySnapshot.forEach((doc) => {
      result.push(Transaction.toTransactionFormat(doc.id, doc.data()));
    });
    callback(result);
  });
}
