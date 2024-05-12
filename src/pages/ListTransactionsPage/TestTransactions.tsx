import { Transaction } from "../../models/Transaction";
import { categories } from "../../models/CategoryModel";
import { users } from "../../models/UserModel";

// interface Transactions {
//   id: number | null;
//   date: Date;
//   payee: string;
//   category: string;
//   description: string;
//   amount: number;
//   user: string;
//   isCommon: boolean;
//   cardType: string;
//   creationDate: Date | null;
// }

export const cardTypes = {
  MainDebit: "Main Debit Card",
  Szep: "SZÉP",
  Egeszseg: "Egészség",
  Revolut: "Revolut",
};

export const testTransactions: Transaction[] = [
  {
    id: 1,
    date: new Date("2023.10.31"),
    payee: "Papír írószer",
    category: categories.Other,
    description: "-",
    amount: -2630,
    user: users.Lau,
    isCommon: true,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2023.10.31"),
  },
  {
    id: 2,
    date: new Date("2023.11.08"),
    payee: "rent",
    category: categories.Rent,
    description: "-",
    amount: -100000,
    user: users.Lau,
    isCommon: true,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2023.11.08"),
  },
  {
    id: 3,
    date: new Date("2023.11.05"),
    payee: "Wolt",
    category: categories.FoodDelivery,
    description: "-",
    amount: -5864,
    user: users.Lau,
    isCommon: true,
    cardType: cardTypes.Szep,
    creationDate: new Date("2023.11.05"),
  },
  {
    id: 4,
    date: new Date("2023.12.12"),
    payee: "Alle Gyógyszertár",
    category: categories.Medicine,
    description: "feketenadálytő krém",
    amount: -1129,
    user: users.Lau,
    isCommon: true,
    cardType: cardTypes.Egeszseg,
    creationDate: new Date("2023.12.12"),
  },
  {
    id: 5,
    date: new Date("2023.10.28"),
    payee: "MvM Áram",
    category: categories.Rent,
    description: "-",
    amount: -6708,
    user: users.Peter,
    isCommon: true,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2023.10.28"),
  },
  {
    id: 6,
    date: new Date("2023.12.22"),
    payee: "Clario Clinical Kft.",
    category: categories.Income,
    description: "Salary",
    amount: 630060,
    user: users.Lau,
    isCommon: false,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2023.12.22"),
  },
  {
    id: 7,
    date: new Date("2023.11.08"),
    payee: "rent",
    category: categories.Rent,
    description: "-",
    amount: -100000,
    user: users.Lau,
    isCommon: true,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2023.11.08"),
  },
  {
    id: 8,
    date: new Date("2023.10.31"),
    payee: "Lidl",
    category: categories.Groceries,
    description: "-",
    amount: -19897,
    user: users.Peter,
    isCommon: true,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2023.10.31"),
  },
  {
    id: 9,
    date: new Date("2023.10.29"),
    payee: "Lidl",
    category: categories.Groceries,
    description: "-",
    amount: -17069,
    user: users.Peter,
    isCommon: true,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2023.10.29"),
  },
  {
    id: 10,
    date: new Date("2023.12.15"),
    payee: "Green Papir",
    category: categories.Other,
    description: "Beer photo",
    amount: -2195,
    user: users.Lau,
    isCommon: true,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2023.12.15"),
  },
  {
    id: 11,
    date: new Date("2024.01.05"),
    payee: "OTP Ertekszamla",
    category: categories.Investment,
    description: "recurring",
    amount: -50000,
    user: users.Lau,
    isCommon: false,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2024.01.05"),
  },
  {
    id: 12,
    date: new Date("2024.01.25"),
    payee: "Spar",
    category: categories.Groceries,
    description: "-",
    amount: -21689,
    user: users.Lau,
    isCommon: true,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2024.01.25"),
  },
  {
    id: 13,
    date: new Date("2023.12.30"),
    payee: "OTP",
    category: categories.Banking,
    description: "Kamatjovairas",
    amount: +75,
    user: users.Lau,
    isCommon: false,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2023.12.30"),
  },
  {
    id: 14,
    date: new Date("2023.12.30"),
    payee: "OTP",
    category: categories.Banking,
    description: "Havi csomagdij",
    amount: -394,
    user: users.Lau,
    isCommon: false,
    cardType: cardTypes.MainDebit,
    creationDate: new Date("2023.12.30"),
  },
];

// const dbTestData = [
//   {
//     "amount": -2630,
//     "cardType": "MainDebit",
//     "categoryId": "Other",
//     "date": "2023-10-31T09:13:28",
//     "isCommon": true,
//     "payee": "Papír írószer",
//     "userId": "Lau",
//     "description": ""
//   },
// {
//   "amount": -394,
//     "cardType": "MainDebit",
//     "categoryId": "Banking",
//     "date": "2023-12-30T00:00:00",
//     "isCommon": false,
//     "payee": "OTP",
//     "userId": "Lau",
//     "description": "Havi csomagdij"
// },
//   {
//     "amount": -17069,
//       "cardType": "MainDebit",
//       "categoryId": "Groceries",
//       "date": "2023-10-29T00:00:00",
//       "isCommon": true,
//       "payee": "Lidl",
//       "userId": "Peter",
//       "description": ""
//   }
// ];
