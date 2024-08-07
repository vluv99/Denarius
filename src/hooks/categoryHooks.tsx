import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {CATEGORY_COLLECTION_NAME, db} from "../utils/firebase";
import { Category } from "../models/CategoryModel";


export function useGetCategoryData() {
  const [categories, setCategoriesData] = useState<Category[]>([]);
  const docRef = collection(db, CATEGORY_COLLECTION_NAME);
  const q = query(docRef, orderBy("priority", "asc"));

  useEffect(() => {
    // onSnapshot so we can get data update real-time
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categories = querySnapshot.docs.map((doc) => {
        const data = doc.data(); // return data compatible with data types specified
        return {
          name: data.name,
          color: data.color,
          id: doc.id,
          expenseType: data.expenseType,
          priority: data.priority,
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
