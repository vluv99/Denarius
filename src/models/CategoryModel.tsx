export type Category = {
  id: string;
  name: string;
  color: string;
  expenseType: string; // "Income" | "Expense" | "Neutral"
};

// ###################### TEST ######################

export const categories_test = {
  Groceries: "Groceries",
  Food: "Food",
  FoodDelivery: "Food Delivery",
  Rent: "Rent",
  Travel: "Travel",
  Medicine: "Medicine",
  Electronics: "Electronics",
  Furniture: "Furniture",
  Vacation: "Vacation",
  Income: "Income",
  Banking: "Banking",
  Investment: "Investment",
  Other: "Other",
};
