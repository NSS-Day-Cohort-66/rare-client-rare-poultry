import { useEffect, useState } from "react";
import { commentsService } from "../services/commentsService";

export const Categories = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    commentsService().then((obj) => {
      setComments(obj);
    });
  }, []);

  return (
    <>
      <div>
        <label className="text-xl underline font-bold">Comments</label>
        <div>
          {comments.map((obj) => {
            return <div key={obj.id}>{obj.content}</div>;
          })}
        </div>
      </div>
    </>
  );
};
