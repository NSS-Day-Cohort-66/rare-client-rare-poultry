import { useEffect, useState } from "react";
import { getAllTags } from "../services/tagService";

export const Tags = () => {
  const [allTags, setAllTags] = useState([
    {
      id: 1,
      label: "Network Not Online",
    },
  ]);
  const [newTag, setNewTag] = useState({ label: "" });

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
    setAllTags(updatedTags) 
    setNewTag({label:""})
    ;
  };

  return (
    <div className="__tags-container__ flex flex-col w-7/12">
      <div className="__tags-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center rounded-t-lg">
        Tags
      </div>
      <div className="__tags-list-form-container__ flex">
        <div className="__tags-list__ flex flex-wrap gap-4 bg-cyan-950/60 border border-white/40 py-20 items-center justify-center rounded-lg">
          {allTags.map((tag) => {
            return (
              <div
                className="__tags-item__ bg-cyan-500 py-1 px-2 text-cyan-950"
                key={tag.id}
              >
                {tag.label}
              </div>
            );
          })}
        </div>
        <form className="__tags-form__ flex flex-col">
          <div>Add a Tag!</div>
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
          <button onClick={(event) => {
            addTag(event)
          }}>Save Tag</button>
        </form>
      </div>
    </div>
  );
};
