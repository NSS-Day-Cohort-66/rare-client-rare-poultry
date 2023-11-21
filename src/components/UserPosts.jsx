import { useEffect, useState } from "react";
import { postService } from "../services/postService";

export const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

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

  if (userPosts == []) {
    return <div>No Posts to Show!</div>;
  }

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
