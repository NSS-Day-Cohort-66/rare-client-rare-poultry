import { useEffect, useState, useRef } from "react";
import { postService } from "../services/postService";
import { Link } from "react-router-dom";
import deleteButton from "../assets/trash.png"

export const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [deletePost, setDeletePost] = useState(null)
  const deleteModal = useRef()

  useEffect(() => {
    postService().then((obj) => {
      setPosts(obj);
    });
  }, []);

  useEffect(() => {
    let filteredPosts = [];
    posts.map((obj) => {
      if (obj.is_owner === true) {
        filteredPosts.push(obj);
      }
    });
    setUserPosts(filteredPosts);
  }, [posts]);


  const handlePostDelete = async (id) => {
    if (!id) {
        console.error("No post ID available for deletion.")
        return
    }

    try {
        const response =  await fetch(`http://localhost:8000/posts/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("rare_token")).token}`,
                "Content-Type": "application/json",
            }
        })

        if (response.ok) {
            const updatedPosts = await postService();
            setAllPosts(updatedPosts)
        } else {
            console.error('Failed to delete post:', response)
        }
    } catch (error) {
        console.error('Error during deletion:', error)
    } finally {
        deleteModal.current.close()

    }
}

  if (userPosts.length === 0) {
    return <div className="__no-posts-item__ bg-cyan-500 py-4 px-6 text-cyan-950 text-xl font-bold mb-4 rounded-md flex flex-col">No Posts to Show!</div>;
  }

  return (
    <div className="__posts-container__ flex flex-col w-7/12">
      <label className="__posts-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center rounded-t-lg">
        Your Posts
      </label>
      <div className="__posts-list__ bg-cyan-950/60 border border-white/40 py-20 rounded-lg self-center">
        <ul>
          {userPosts.map((post) => (
            <li
              key={post.id}
              className="border-b border-white/40 last:border-b-0 p-4"
            >
              <h2 className="text-xl font-bold mb-2">
                <Link
                  to={`/posts/${post.id}`}
                  className="text-teal-400 hover:text-blue-700 underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-white"><span className="font-bold">Author:</span> {post.user.user.author_name}</p>
              <p className="text-white"><span className="font-bold">Category:</span>{post.category_name}</p>
              <div>
                <button className="btn-delete" onClick={() => { setDeletePost(post.id); deleteModal.current.showModal(); }}>
                <img src={deleteButton} />
                  </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
        <dialog className="__delete-modal__ bg-red-400/90 p-10 font-bold rounded border border-white" ref={deleteModal}>
          <div>Are you sure you want to delete this post?</div>
            <div className="__btn-container__ flex justify-around mt-6">
                <button className="btn-edit px-6" onClick={() => handlePostDelete(deletePost)}>Ok</button>
                <button className="btn-delete" onClick={() => deleteModal.current.close()}>Cancel</button>
            </div>
          </dialog>
      </div>
  );
};
