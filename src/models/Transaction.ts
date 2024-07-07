//import moment from "moment";

import { Category } from "./CategoryModel";
import { User } from "./UserModel";
import { PaymentMethod } from "./PaymentMethodModel";
import moment from "moment";

/**
 * Represents a single Transaction
 */
export class Transaction {
  transactionId: string;
  creationDate: Date;
  creatorUserId: string;
  date: Date;
  category: Category;
  payee: string;
  amount: number;
  user: User;
  paymentMethod: PaymentMethod;
  isCommon: boolean;
  description: string;

  constructor(
    transactionId: string,
    creationDate: Date,
    creatorUserId: string,
    date: Date,
    category: Category,
    payee: string,
    amount: number,
    user: User,
    paymentMethod: PaymentMethod,
    isCommon: boolean,
    description: string,
  ) {
    this.transactionId = transactionId;
    this.creationDate = creationDate;
    this.creatorUserId = creatorUserId;
    this.date = date;
    this.category = category;
    this.payee = payee;
    this.amount = amount;
    this.user = user;
    this.paymentMethod = paymentMethod;
    this.isCommon = isCommon;
    this.description = description;
  }

  toDatabaseFormat(currentUser: User) {
    return {
      creationDate: new Date(),
      creatorUserId: currentUser.userId,
      date: new Date(this.date),
      category: this.category.id,
      payee: this.payee,
      amount: this.amount,
      user: this.user.userId,
      paymentMethod: this.paymentMethod.id,
      isCommon: this.isCommon,
      description: this.description,
    };
  }

  static toTransactionFormat(data: any): Transaction {
    return new Transaction(
      data.transactionId,
      data.creationDate,
      data.creatorUserId,
      data.date,
      data.category,
      data.payee,
      Number(data.amount),
      data.user,
      data.paymentMethod,
      data.isCommon,
      data.description,
    );
  }
}
