import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Transaction } from "../models/Transaction";
import { User } from "../models/UserModel";

const TRANSACTION_COLLECTION_NAME = "transaction";

export async function addTransaction(data: any, currentUser: User) {
  console.log("addTransaction");
  const t = Transaction.toTransactionFormat(data);
  console.log(t);

  try {
    await addDoc(
      collection(db, TRANSACTION_COLLECTION_NAME),
      t.toDatabaseFormat(currentUser),
    );
  } catch (e) {
    console.error(e);
    throw e;
  }

  return t;
}
