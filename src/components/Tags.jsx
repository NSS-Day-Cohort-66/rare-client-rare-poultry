import { useEffect, useState, useRef } from "react";
import { getAllTags } from "../services/tagService";
import editButton from "../assets/edit.png";
import deleteButton from "../assets/trash.png";

export const Tags = () => {
  const [allTags, setAllTags] = useState([
    {
      id: 1,
      label: "Network Not Online",
    },
  ]);
  const [newTag, setNewTag] = useState({ label: "" });
  const [editTag, setEditTag] = useState({});
  const editModal = useRef();
  const deleteModal = useRef();

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

  const changeTag = async (event, id) => {
    event.preventDefault();
    const finalValue = {
      label: editTag.label,
    };

    await fetch(`http://localhost:8000/tags/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalValue),
    });

    const updatedTags = await getAllTags();
    editModal.current.close();
    setAllTags(updatedTags);
    setEditTag({ label: "" });
  };

  return (
    <div className="__tags-container__ flex flex-col w-9/12 items-center">
      <div className="__tags-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center translate-x-2 rounded-t-lg">
        Tags
      </div>
      {/* Edit Modal Designated Below*/}
      <dialog
        className="__edit-modal__ bg-sky-400/90 p-10 font-bold"
        ref={editModal}
      >
        <div>Edit Tag</div>
        <form>
          <fieldset>
            <input className="input-text" value={editTag.label} onChange={(event) => {
              const copy = { ...editTag}
              copy.label = event.target.value
              setEditTag(copy)
            }}></input>
          </fieldset>
          <button
            className="btn-edit"
            onClick={(event) => {
              changeTag(event, editTag.id);
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
        </form>
      </dialog>
      {/* Edit Modal Designated Below*/}
      <dialog
        className="__delete-modal__ bg-red-400/90 p-10 font-bold"
        ref={deleteModal}
      >
        <div>Delete Modal</div>
        <button
          className="btn-delete"
          onClick={() => deleteModal.current.close()}
        >
          Close Modal
        </button>
      </dialog>
      <div className="__tags-list-form-container__ flex h-[700px]">
        <div className="__tags-list__ flex flex-col flex-1 flex-wrap gap-2 bg-cyan-950/60 border border-white/40 items-center rounded-lg p-10">
          {allTags.map((tag) => {
            return (
              <div
                className="__tags-item-container__ bg-cyan-500/40 py-1 px-2 text-cyan-950 flex items-center justify-between w-[256px] rounded"
                key={tag.id}
              >
                <div>
                  <button
                    onClick={() => {
                      setEditTag(tag);
                      editModal.current.showModal();
                    }}
                    className="btn-edit"
                  >
                    <img src={editButton} />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteModal.current.showModal()}
                  >
                    <img src={deleteButton} />
                  </button>
                </div>

                <div className="justify-self-end text-white font-bold">
                  {tag.label}
                </div>
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
                className="__tag-label-input__ input-text"
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
