export class CategoryModel {
  categoryId?: number | undefined;
  categoryName: string;

  constructor(data: CategoryModel) {
    this.categoryId = data.categoryId;
    this.categoryName = data.categoryName;
  }

  // static toModel(u: User): UserModel {
  //
  //     return model;
  // }
}

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
