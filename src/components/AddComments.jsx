import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const AddComments = () => {
  const { postId } = useParams();
  const [comment, setComment] = useState({
    post: postId,
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const itemCopy = { ...comment };
    itemCopy[event.target.name] = event.target.value;
    setComment(itemCopy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`http://localhost:8000/comments`, {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...comment }),
    });
    navigate(`/posts/${postId}/comments`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-4 w-9/12 bg-sky-700/80 px-6 rounded-md border border-white/60"
    >
      <header>
        <div className="text-3xl font-bold text-white my-4">New Comment</div>
      </header>
      <fieldset>
        <div>
          <input
            name="content"
            placeholder="Comment"
            className="input-text w-[512px]"
            value={comment.content}
            type="text"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <button type="submit" className="btn-edit mb-4">
        Publish
      </button>
    </form>
  );
};
