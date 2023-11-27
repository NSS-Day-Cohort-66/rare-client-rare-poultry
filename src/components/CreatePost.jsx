import { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";
import { useNavigate } from "react-router-dom";
import { getAllTags } from "../services/tagService";

export const CreatePost = () => {
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [chosenTags, updateChosen] = useState(new Set());
  const [newPost, setNewPost] = useState({
    title: "",
    image_url: "",
    content: "",
    category: 0,
  });

  const navigate = useNavigate();

  const handleTagChosen = (tag) => {
    const copy = new Set(chosenTags);
    copy.has(tag.id) ? copy.delete(tag.id) : copy.add(tag.id);
    updateChosen(copy);
  };

  useEffect(() => {
    categoryService().then((catArray) => {
      setCategory(catArray);
    });
  }, []);

  useEffect(() => {
    getAllTags().then((tagArray) => {
      setTags(tagArray);
    });
  }, []);

  const handleInputChange = (event) => {
    const itemCopy = { ...newPost };
    itemCopy[event.target.name] = event.target.value;
    setNewPost(itemCopy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`http://localhost:8000/posts`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newPost, tags: Array.from(chosenTags) }),
    });
    navigate("/posts");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 w-9/12 bg-sky-700/80 px-6 rounded-md border border-white/60">
      <header>
        <div className="text-3xl font-bold text-white my-4">New Post</div>
      </header>
      <fieldset>
        <div>
          <input
            name="title"
            placeholder="Title"
            className="input-text w-[512px]"
            value={newPost.title}
            type="text"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div>
          <input
            name="image_url"
            placeholder="Image URL"
            value={newPost.image_url}
            className="input-text w-[512px]"
            type="text"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div>
          <textarea
            name="content"
            className="input-text w-[512px] h-[128px]"
            placeholder="Article Content"
            value={newPost.content}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <select
          name="category"
          onChange={handleInputChange}
          className="rounded p-2 text-sm"
          value={newPost.category}
        >
          <option value={0}>Category Select</option>
          {category.map((catobj) => {
            return (
              <option key={catobj.id} value={catobj.id}>
                {catobj.label}
              </option>
            );
          })}
        </select>
      </fieldset>
      <fieldset className="flex flex-wrap gap-4">
        {tags.map((t) => (
          <div className="flex items-center" key={`tags-${t.id}`}>
            <input
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="checkbox"
              checked={chosenTags.has(t.id)}
              onChange={() => handleTagChosen(t)}
            />
            <div className="ms-2 text-sm text-white">{t.label}</div>

          </div>
        ))}
      </fieldset>
      <button type="submit" className="btn-edit mb-4">Publish</button>
    </form>
  );
};
