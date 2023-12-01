import { useEffect, useState, useRef } from "react";
import { postService } from "../services/postService";
import { Link } from "react-router-dom";
import deleteButton from "../assets/trash.png";

export const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [deletePost, setDeletePost] = useState(null);
  const deleteModal = useRef();
  const gridHeaders = ["Title", "Author", "Date", "Category", "Tags"];

  useEffect(() => {
    postService().then((postsArray) => {
      setAllPosts(postsArray);
    });
  }, []);

  const handlePostDelete = async (id) => {
    if (!id) {
      console.error("No post ID available for deletion.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("rare_token")).token
          }`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedPosts = await postService();
        setAllPosts(updatedPosts);
      } else {
        console.error("Failed to delete post:", response);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      deleteModal.current.close();
    }
  };

  return (
    <div className="__posts-container__ flex flex-col w-[98%]">
      <label className="__posts-header__ text-3xl font-bold bg-sky-800 text-white py-2 px-12 mb-4 self-center rounded-lg border border-white">
        Posts
      </label>
      <div className="__posts-list__ bg-cyan-950/60 border border-white/40 py-5 rounded-lg self-center w-[90%] flex flex-col gap-4">
        <div className="flex justify-between px-4 mr-12">
          {gridHeaders.map((header) => {
            return (
              <div
                className="w-[180px] px-2 py-2 first:w-[400px] last:text-right last:w-[270px] font-bold text-white"
                key={header}
              >
                {header}
              </div>
            );
          })}
        </div>
        {allPosts.map((post) => (
          <div key={post.id} className="flex items-center">
            <div className="__post-row__ px-4 py-4 flex-1 bg-sky-700/80 mx-4 rounded border border-white/80 flex justify-between items-center">
              <div className="__title__ text-xl font-bold w-[400px]">
                <Link
                  to={`/posts/${post.id}`}
                  className="text-white hover:text-cyan-200 underline"
                >
                  {post.title}
                </Link>
              </div>
              <div className="text-white w-[180px]">

                {post.user.user.author_name}
              </div>
              <div className="__publication-date__ text-white w-[180px]">
                {post.publication_date}
              </div>

              <div className="text-white  w-[180px]">{post.category_name}</div>
              <div className="__tags__ flex flex-col items-end w-[270px]">
                {post.tags.map((tag) => {
                    return <div className="text-white bg-slate-950/20 px-2 rounded" key={tag.id}>{tag.label}</div>
                })}
              </div>
            </div>
            {post.is_owner ? (
              <div>
                <button
                  className="btn-delete w-[36px]"
                  onClick={() => {
                    setDeletePost(post.id);
                    deleteModal.current.showModal();
                  }}
                >
                  <img src={deleteButton} />
                </button>
              </div>
            ) : (
              <div className="w-[36px]"></div>
            )}
          </div>
        ))}
      </div>
      <dialog
        className="__delete-modal__ bg-red-400/90 p-10 font-bold rounded border border-white"
        ref={deleteModal}
      >
        <div>Are you sure you want to delete this post?</div>
        <div className="__btn-container__ flex justify-around mt-6">
          <button
            className="btn-edit px-6"
            onClick={() => handlePostDelete(deletePost)}
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
    </div>
  );
};
