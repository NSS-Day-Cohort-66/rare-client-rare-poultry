import { useEffect, useState } from "react";
import { postServiceById } from "../services/postService";
import { useParams } from "react-router-dom";

export const Comments = () => {
  const [post, setPost] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    postServiceById(postId).then((obj) => {
      setPost(obj);
    });
  }, []);

  if (post.comments?.length === 0) {
    return <div>No comments to show!</div>;
  }

  return (
    <>
      <div>
        <label className="text-xl underline font-bold">{post.title}</label>
        <div>
          {post.comments?.map((obj) => {
            return (
              <div key={obj.id}>
                <div>{obj.content}</div>
                <div>{obj.created_on}</div>
                <div>{obj.author.user.author_name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
