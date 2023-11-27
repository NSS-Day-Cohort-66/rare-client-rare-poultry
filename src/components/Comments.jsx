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
    return (
      <div className="text-3xl p-[200px] text-white">No comments to show!</div>
    );
  }

  return (
    <>
      <div className="__post-details-container__ flex flex-col w-7/12">
        <label className="__post-details-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center rounded-t-lg">
          {post.title} Comments:
        </label>
        <div className="__post-details-list__ bg-cyan-950/60 border border-white/40 py-20 rounded-lg self-center w-[585px]">
          {post.comments?.map((obj) => {
            return (
              <div key={obj.id}>
                <div className="text-white text-lg mb-2">{obj.content}</div>
                <div className="text-gray-600">{obj.created_on}</div>
                <div className="text-gray-600">
                  {obj.author.user.author_name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
