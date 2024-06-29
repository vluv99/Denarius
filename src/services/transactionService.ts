import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Transaction } from "../models/Transaction";
import { Category } from "../models/CategoryModel";
import { PaymentMethod } from "../models/PaymentMethodModel";
import { User } from "../models/UserModel";

const TRANSACTION_COLLECTION_NAME = "transaction";

export async function addTransaction(
  data: any,
  // categories: Category[],
  // paymentMethods: PaymentMethod[],
  // currentUser: User | undefined,
) {
  console.log("addTransaction");

  // const categoryModel = categories.find((i) => data.category === i.id);
  // data.category = categoryModel ? categoryModel : data.category;
  //
  // const paymentMethodsModel = paymentMethods.find(
  //   (i) => data.paymentMethod === i.id,
  // );
  // data.paymentMethod = paymentMethodsModel
  //   ? paymentMethodsModel
  //   : data.paymentMethod;
  //
  // data.user = currentUser;

  const t = Transaction.toTransactionFormat(data);

  try {
    await addDoc(
      collection(db, TRANSACTION_COLLECTION_NAME),
      t.toDatabaseFormat(),
    );
  } catch (e) {
    console.error(e);
    throw e;
  }

  return t;
}
