import { createContext, useContext, useEffect, useState } from "react";
import { Category } from "../../models/CategoryModel";
import { ChildrenProp } from "../../utils/types";
import { useGetCategoryData } from "../../hooks/categoryHooks";

export type CategoryCtx = {
  categories: Category[] | undefined;
  catLoading: boolean;
};
const defCategoryCtx = { categories: undefined, catLoading: true };

// create context
const CategoryContext = createContext<CategoryCtx>(defCategoryCtx);

/**
 * Function body of the React context provider element
 * @param children
 * @constructor
 */
export function CategoryContextProvider({ children }: ChildrenProp) {
  const categories: Category[] | undefined = useGetCategoryData();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (categories === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [categories]);

  return (
    <CategoryContext.Provider value={{ categories, catLoading: loading }}>
      {children}
    </CategoryContext.Provider>
  );
}

/**
 * Return categories collected from DB with a simplified function
 */
export const useCategoryContext = (): CategoryCtx => {
  return useContext(CategoryContext);
};
