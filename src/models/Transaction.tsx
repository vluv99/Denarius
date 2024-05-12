//import moment from "moment";

/**
 * Represents a single Transaction
 */
export class Transaction {
  id?: number | undefined;
  date: Date;
  payee: string;
  category: string;
  description?: string | null;
  amount: number;
  user: string;
  isCommon: boolean;
  cardType: string;
  creationDate?: Date | null;

  constructor(data: Transaction) {
    this.id = data.id;
    this.date = data.date;
    this.payee = data.payee;
    this.category = data.category;
    this.description = data.description;
    this.amount = data.amount;
    this.user = data.user;
    this.isCommon = data.isCommon;
    this.cardType = data.cardType;
  }

  // static toModel(t: TransactionDTO): Transaction {
  //   let model = new Transaction({
  //     ...t,
  //     category: t.categoryId,
  //     user: t.userId,
  //     date: new Date(t.date),
  //     creationDate: new Date(t.creationDate!),
  //   });
  //
  //   return model;
  // }
  //
  // static toDatabaseFormat(t: Transaction): TransactionDTO {
  //   let model = {
  //     ...t,
  //     categoryId: t.category,
  //     userId: t.user,
  //     date: moment(t.date).format(),
  //     creationDate: undefined,
  //   };
  //
  //   return model;
  // }
}
