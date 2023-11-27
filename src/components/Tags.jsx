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

  const deleteTag = async (event, id) => {
    event.preventDefault();

    await fetch(`http://localhost:8000/tags/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
    });

    const updatedTags = await getAllTags();
    deleteModal.current.close();
    setAllTags(updatedTags);
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
      <div className="__tags-header__ text-3xl font-bold bg-sky-800 text-white py-2 px-12 mb-4 self-center rounded-lg border border-white">
        Tags
      </div>
      {/* Edit Modal Designated Below*/}
      <dialog
        className="__edit-modal__ bg-sky-400/90 p-10 font-bold rounded border border-white"
        ref={editModal}
      >
        <form className="flex flex-col gap-4 items-center">
          <div>Edit this tag</div>
          <fieldset>
            <input
              className="input-text"
              value={editTag.label}
              onChange={(event) => {
                const copy = { ...editTag };
                copy.label = event.target.value;
                setEditTag(copy);
              }}
            ></input>
          </fieldset>
          <div className="__btn-container__ flex gap-4 justify-between">
            <button
              className="btn-edit px-6"
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
          </div>
        </form>
      </dialog>
      {/* Delete Modal Designated Below*/}
      <dialog
        className="__delete-modal__ bg-red-400/90 p-10 font-bold rounded border border-white"
        ref={deleteModal}
      >
        <div>Are you sure you want to delete this tag?</div>
        <div className="__btn-container__ flex justify-around mt-6">
          <button
            className="btn-edit px-6"
            onClick={(event) => {
              deleteTag(event, editTag.id);
            }}
          >
            Ok
          </button>
          <button
            className="btn-delete"
            onClick={() => deleteModal.current.close()}
          >
            Cancel
          </button>
        </div>
      </dialog>
      <div className="__tags-list-form-container__ flex h-[684px]">
        <div className="__tags-list__ flex flex-col flex-1 flex-wrap gap-2 bg-sky-950/60 border border-white/40 items-center rounded-lg p-10">
          {allTags.map((tag) => {
            return (
              <div
                className="__tags-item-container__ bg-sky-500/40 py-1 px-2 text-cyan-950 flex items-center justify-between w-[256px] rounded"
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
                    onClick={() => {
                      setEditTag(tag);
                      deleteModal.current.showModal();
                    }}
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
