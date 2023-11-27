import { useEffect, useState } from "react";
import { categoryService } from "../services/categoryService";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const [category, setCategory] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    image_url: "",
    content: "",
    category: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    categoryService().then((catArray) => {
      setCategory(catArray);
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
      body: JSON.stringify(newPost),
    });
    navigate("/posts");
  };

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h1>New Post</h1>
      </header>
      <fieldset>
        <h2>Title</h2>
        <div>
          <input
            name="title"
            placeholder="post title"
            value={newPost.title}
            type="text"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <h2>Image URL</h2>
        <div>
          <input
            name="image_url"
            placeholder="image URL"
            value={newPost.image_url}
            type="text"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <h2>Content</h2>
        <div>
          <textarea
            name="content"
            placeholder="post content"
            value={newPost.content}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <h2>Category</h2>
        <select
          name="category"
          onChange={handleInputChange}
          value={newPost.category}
        >
          <option value={0}>Please select a category</option>
          {category.map((catobj) => {
            return (
              <option key={catobj.id} value={catobj.id}>
                {catobj.label}
              </option>
            );
          })}
        </select>
      </fieldset>
      <button type="submit">Publish</button>
    </form>
  );
};
