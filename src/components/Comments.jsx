import { useEffect, useState } from "react";
import { postServiceById } from "../services/postService";

export const Comments = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    postServiceById(1).then((obj) => {
      setPost(obj);
    });
  }, []);

  return (
    <>
      <div>
        <label className="text-xl underline font-bold">{post.title}</label>
        <div>
          {post.comments?.map((obj) => {
            return (
              <>
                <div key={obj.id}>{obj.content}</div>
                <div>{obj.created_on}</div>
                <div>{obj.comments.author.user.author_name}</div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
