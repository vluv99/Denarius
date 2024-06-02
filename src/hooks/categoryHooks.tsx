import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Category } from "../models/CategoryModel";

const CATEGORY_COLLECTION_NAME = "category";

export function useGetCategoryData() {
  const [categories, setCategoriesData] = useState<Category[]>([]);
  const docRef = collection(db, CATEGORY_COLLECTION_NAME);

  useEffect(() => {
    // onSnapshot so we can get data update real-time
    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      const categories = querySnapshot.docs.map((doc) => {
        const data = doc.data(); // return data compatible with data types specified
        return {
          name: data.name,
          color: data.color,
          id: doc.id,
        };
      });
      setCategoriesData(categories);
      console.log(categories);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return categories;
}
