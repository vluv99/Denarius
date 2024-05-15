import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";

type Category = {
  name: string;
  color: string;
};

export function useCategoryData() {
  const [categories, setCategoriesData] = useState<Category[]>([]);
  const docRef = collection(db, "category");

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
