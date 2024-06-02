import { createContext, useContext, useState } from "react";
import { Category } from "../../models/CategoryModel";
import { ChildrenProp } from "../../utils/types";
import { useGetCategoryData } from "../../hooks/categoryHooks";

// create context
const CategoryContext = createContext<Category[]>([]);

/**
 * Function body of the React context provider element
 * @param children
 * @constructor
 */
export function CategoryContextProvider({ children }: ChildrenProp) {
  const categories: Category[] = useGetCategoryData();

  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
}

/**
 * Return categories collected from DB with a simplified function
 */
export const useCategoryContext = (): Category[] => {
  return useContext(CategoryContext);
};
