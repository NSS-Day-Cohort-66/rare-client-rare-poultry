import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

export const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const deleteTagModal = useRef();

  useEffect(() => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token;

    fetch(`http://localhost:8000/posts/${postId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((postData) => setPost(postData))
      .catch((error) => console.error("Error fetching post:", error));
  }, [postId]);

  const handleTagsButtonClick = () => {
    deleteTagModal.current.showModal();
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="__post-details-container__ flex flex-col w-7/12">
      <label className="__post-details-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center rounded-t-lg">
        Post Details
      </label>
      {/* Delete Tag Modal Designated Below*/}
      <dialog
        className="__delete-modal__ bg-red-400/90 p-10 font-bold rounded border border-white"
        ref={deleteTagModal}
      >
        <div>
          <strong>Select Tags to Remove</strong>
        </div>
        <div>
          {post.tags.map((t) => (
            <div className="flex items-center" key={`tags-${t.id}`}>
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
              />
              <label className="ml-2">{t.label}</label>
            </div>
          ))}
        </div>
        <button
          className="btn-delete"
          onClick={() => deleteTagModal.current.close()}
        >
          Close
        </button>
      </dialog>
      <div className="__post-details-list__ bg-cyan-950/60 border border-white/40 py-20 rounded-lg self-center">
        <h2 className="text-xl font-bold mb-4 text-teal-800">{post.title}</h2>
        {post.image_url && (
          <img src={post.image_url} className="w-full h-auto mb-4 rounded" />
        )}
        <p className="text-gray-700 text-lg mb-2">{post.content}</p>
        <p className="text-gray-600">Published on: {post.publication_date}</p>
        <p className="text-gray-600">Author: {post.user.user.author_name}</p>
        <div>Tags:</div>
        <div>
          {post.tags.map((tag) => (
            <span key={tag.id} className="tag">{`${tag.label}, `}</span>
          ))}
        </div>
        <button className="btn-delete" onClick={handleTagsButtonClick}>
          <p>Manage Tags</p>
        </button>
      </div>
      <button>
        <Link to={`/posts/${post.id}/comments`}>Comments</Link>
      </button>
    </div>
  );
};
