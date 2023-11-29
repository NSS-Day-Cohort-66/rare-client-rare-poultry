import { useEffect, useState, useRef } from "react";
import { categoryService } from "../services/categoryService";
import editButton from "../assets/edit.png";
import deleteButton from "../assets/trash.png";

export const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      label: "Network Not Online",
    },
  ]);
  const [newCategory, setNewCategory] = useState({ label: "" });
  const [editCategory, setEditCategory] = useState({});
  const editModal = useRef();
  const deleteModal = useRef();

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

  const deleteCategory = async (event, id) => {
    event.preventDefault();

    await fetch(`http://localhost:8000/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
    });

    const updatedCategories = await categoryService();
    deleteModal.current.close();
    setCategories(updatedCategories);
  };

  const changeCategory = async (event, id) => {
    event.preventDefault();
    const finalValue = {
      label: editCategory.label,
    };

    await fetch(`http://localhost:8000/categories/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalValue),
    });

    const updatedTags = await categoryService();
    editModal.current.close();
    setCategories(updatedTags);
    setEditCategory({ label: "" });
  };

  return (
    <div className="__categories-container__ flex flex-col w-9/12 items-center">
      <div className="__categories-header__ text-3xl font-bold bg-cyan-800 text-white py-2 px-12 mb-4 self-center rounded-lg border border-white">
        Categories
      </div>
      {/* Edit Modal Designated Below*/}
      <dialog
        className="__edit-modal__ bg-sky-400/90 p-10 rounded border border-white"
        ref={editModal}
      >
        <form className="flex flex-col gap-4 items-center">
          <div className="font-bold text-lg">Edit this category</div>
          <fieldset>
            <input
              className="input-text"
              value={editCategory.label}
              onChange={(event) => {
                const copy = { ...editCategory };
                copy.label = event.target.value;
                setEditCategory(copy);
              }}
            ></input>
          </fieldset>
          <div className="__btn-container__ flex gap-4 justify-between">
            <button
              className="btn-edit px-6"
              onClick={(event) => {
                changeCategory(event, editCategory.id);
              }}
            >
              Ok
            </button>
            <button
              className="btn-delete"
              onClick={() => editModal.current.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
      {/* Delete Modal Designated Below*/}
      <dialog
        className="__delete-modal__ bg-red-400/90 p-10 font-bold rounded border border-white"
        ref={deleteModal}
      >
        <div className="flex flex-col gap-4 items-center">
          <div>Are you sure you want to Delete {editCategory.label}?</div>
          <div className="space-x-4">
            <button
              className="btn-delete"
              onClick={(event) => {
                deleteCategory(event, editCategory.id);
              }}
            >
              Yes
            </button>
            <button
              className="btn-delete"
              onClick={() => deleteModal.current.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      <div className="__categories-list-form-container__ flex h-[684px]">
        <div className="__categories-list__ flex flex-col flex-1 flex-wrap gap-2 bg-cyan-950/60 border border-white/40 items-center rounded-lg p-10">
          {categories.map((category) => {
            return (
              <div
                className="__tags-item-container__ bg-cyan-500/40 py-1 px-2 text-cyan-950 flex items-center justify-between w-[256px] rounded"
                key={category.id}
              >
                <div>
                  <button
                    onClick={() => {
                      setEditCategory(category);
                      editModal.current.showModal();
                    }}
                    className="btn-edit"
                  >
                    <img src={editButton} />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => {
                      setEditCategory(category);
                      deleteModal.current.showModal();
                    }}
                  >
                    <img src={deleteButton} />
                  </button>
                </div>

                <div className="justify-self-end text-white font-bold">
                  {category.label}
                </div>
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
                className="__category-label-input__ input-text"
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
