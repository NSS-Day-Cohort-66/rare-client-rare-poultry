import { useEffect, useState, useRef } from "react";
import { getAllTags } from "../services/tagService";

export const Tags = () => {
  const [allTags, setAllTags] = useState([
    {
      id: 1,
      label: "Network Not Online",
    },
  ]);
  const [newTag, setNewTag] = useState({ label: "" });
  const existDialog = useRef();
  useEffect(() => {
    getAllTags().then((tagsArray) => {
      setAllTags(tagsArray);
    });
  }, []);

  const addTag = async (event) => {
    event.preventDefault();

    await fetch(`http://localhost:8000/tags`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTag),
    });

    const updatedTags = await getAllTags(); //? Refreshes state and clears label entry field
    setAllTags(updatedTags);
    setNewTag({ label: "" });
  };

  return (
    <div className="__tags-container__ flex flex-col w-9/12 items-center">
      <dialog className="__edit-modal__" ref={existDialog}>
        <div>Modal Test</div>
        <button onClick={() => existDialog.current.close()}>Close Modal</button>
      </dialog>
      <div className="__tags-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center translate-x-2 rounded-t-lg">
        Tags
      </div>
      <div className="__tags-list-form-container__ flex h-screen">
        <div className="__tags-list__ flex flex-col flex-wrap gap-4 bg-cyan-950/60 border border-white/40 items-center rounded-lg p-10">
          {allTags.map((tag) => {
            return (
              <div
                className="__tags-item-container__ bg-cyan-500 py-1 px-2 text-cyan-950 flex items-center justify-between w-[256px]"
                key={tag.id}
              >
                <div>
                  <button
                    onClick={() => existDialog.current.showModal()}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button className="btn-delete">Delete</button>
                </div>

                <div className="justify-self-end">{tag.label}</div>
              </div>
            );
          })}
        </div>
        <div className="__tag-form-container__ self-center">
          <form className="__tags-form__ flex flex-col items-center justify-center px-4 py-8 rounded-r-xl border border-white/20 gap-4 bg-cyan-600/20">
            <div className="__tags-form-header__ text-lg text-white font-bold">
              Add a Tag!
            </div>
            <fieldset>
              <input
                type="text"
                className="__tag-label-input__"
                value={newTag.label}
                placeholder="Add a tag..."
                onChange={(event) => {
                  const copy = { ...newTag };
                  copy.label = event.target.value;
                  setNewTag(copy);
                }}
              />
            </fieldset>
            <button
              className="btn-edit"
              onClick={(event) => {
                addTag(event);
              }}
            >
              Save Tag
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
