import { useEffect, useState } from "react";
import { postService } from "../services/postService";

export const UserPosts = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    postService().then((obj) => {
      setPosts(obj);
    });
    const variable = JSON.parse(localStorage.getItem("honey_user"));
    const userId = variable.id;
    setUser(userId);
  }, []);

  useEffect(() => {
    let filteredPosts = [];
    posts.map((obj) => {
      if (obj.user.id === user) {
        filteredPosts.push(obj);
      }
    });
    setUserPosts(filteredPosts);
  }, [posts, user]);

  return (
    <div>
      <label className="text-xl underline font-bold">Posts</label>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <h2>
              <div>{post.title}</div>
            </h2>
            <p>Author: {post.user.author_name}</p>
            <p>Category: {post.category_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
