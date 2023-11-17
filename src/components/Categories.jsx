import { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService().then((obj) => {
      // Sort the categories alphabetically by label
      const sortedCategories = obj.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setCategories(sortedCategories);
    });
  }, []);

  return (
    <>
      <div>
        <label className="text-xl underline font-bold">Categories</label>
        <div>
          {categories.map((obj) => {
            return <div key={obj.id}>{obj.label}</div>;
          })}
        </div>
      </div>
    </>
  );
};
