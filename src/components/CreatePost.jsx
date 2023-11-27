import { useState } from "react";

export const CreatePost = () => {
  const [newPost, setNewPost] = useState({
    title: "",
    image_url: "",
    content: "",
  });

  return (
    <form>
      <header>
        <h1>New Post</h1>
      </header>
      <fieldset>
        <h2>Title</h2>
        <div>
          <input
            title="title"
            placeholder="post title"
            value={newPost.title}
            type="text"
          ></input>
        </div>
      </fieldset>
    </form>
  );
};
