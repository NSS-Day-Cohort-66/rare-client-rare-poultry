import { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";

export const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      label: "Network Not Online",
    },
  ]);
  const [newCategory, setNewCategory] = useState({ label: "" });

  useEffect(() => {
    categoryService().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
  }, []);

  const addCategory = async (event) => {
    event.preventDefault();

    await fetch(`http://localhost:8000/categories`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });

    const updatedCategories = await categoryService();
    setCategories(updatedCategories);
    setNewCategory({ label: "" });
  };

  return (
    <div className="__categories-container__ flex flex-col w-7/12">
      <div className="__categories-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-start translate-x-2 rounded-t-lg">
        Categories
      </div>
      <div className="__categories-list-form-container__ flex">
        <div className="__categories-list__ flex flex-wrap gap-4 bg-cyan-950/60 border border-white/40 py-20 items-center justify-center rounded-lg p-10">
          {categories.map((category) => {
            return (
              <div
                className="__categories-item__ bg-cyan-500 py-1 px-2 text-cyan-950"
                key={category.id}
              >
                {category.label}
              </div>
            );
          })}
        </div>
        <div className="__category-form-container__ self-center">
          <form className="__categories-form__ flex flex-col items-center justify-center px-4 py-8 rounded-r-xl border border-white/20 gap-4 bg-cyan-600/20">
            <div className="__categories-form-header__ text-lg text-white font-bold">
              Add a Category!
            </div>
            <fieldset>
              <input
                type="text"
                className="__category-label-input__"
                value={newCategory.label}
                placeholder="Add a category..."
                onChange={(event) => {
                  const copy = { ...newCategory };
                  copy.label = event.target.value;
                  setNewCategory(copy);
                }}
              />
            </fieldset>
            <button
              className="btn-edit"
              onClick={(event) => {
                addCategory(event);
              }}
            >
              Save Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
