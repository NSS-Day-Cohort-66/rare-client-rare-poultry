import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

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

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="__post-details-container__ flex flex-col w-7/12">
      <label className="__post-details-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center rounded-t-lg">
        Post Details
      </label>
      <div className="__post-details-list__ bg-cyan-950/60 border border-white/40 py-20 rounded-lg self-center">
        <h2 className="text-xl font-bold mb-4 text-teal-800">{post.title}</h2>
        {post.image_url && (
          <img src={post.image_url} className="w-full h-auto mb-4 rounded" />
        )}
        <p className="text-gray-700 text-lg mb-2">{post.content}</p>
        <p className="text-gray-600">Published on: {post.publication_date}</p>
        <p className="text-gray-600">Author: {post.user.user.author_name}</p>
      </div>
      <button>
        <Link to={`/posts/${post.id}/addcomments`}> Add a Comment</Link>
      </button>
      <button>
        <Link to={`/posts/${post.id}/comments`}>View Comments</Link>
      </button>
    </div>
  );
};
