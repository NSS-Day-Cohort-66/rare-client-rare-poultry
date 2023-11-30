import { useEffect, useState, useRef } from "react";
import { postServiceById } from "../services/postService";
import { useParams } from "react-router-dom";
import editButton from "../assets/edit.png";
import deleteButton from "../assets/trash.png";

export const Comments = () => {
  const [post, setPost] = useState([]);
  const [editComment, setEditComment] = useState({});
  const { postId } = useParams();
  const editModal = useRef();
  const deleteModal = useRef();

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

  const deleteComment = async (event, id) => {
    event.preventDefault();

    await fetch(`http://localhost:8000/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
    });

    const updatedComment = await postServiceById(postId);
    deleteModal.current.close();
    setPost(updatedComment);
  };

  const changeComment = async (event, id) => {
    event.preventDefault();
    const finalValue = {
      content: editComment.content,
      post: postId,
      author: editComment.author.id,
    };

    await fetch(`http://localhost:8000/comments/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rare_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalValue),
    });

    const updatedComment = await postServiceById(postId);
    editModal.current.close();
    setPost(updatedComment);
    setEditComment({ content: "" });
  };

  return (
    <>
      {/* Edit Modal Designated Below*/}
      <dialog
        className="__edit-modal__ bg-sky-400/90 p-10 rounded border border-white"
        ref={editModal}
      >
        <form className="flex flex-col gap-4 items-center">
          <div className="font-bold text-lg">Edit this Comment</div>
          <fieldset>
            <input
              className="input-text"
              value={editComment.content}
              onChange={(event) => {
                const copy = { ...editComment };
                copy.content = event.target.value;
                setEditComment(copy);
              }}
            ></input>
          </fieldset>
          <div className="__btn-container__ flex gap-4 justify-between">
            <button
              className="btn-edit px-6"
              onClick={(event) => {
                changeComment(event, editComment.id);
              }}
            >
              Ok
            </button>
            <button
              className="btn-delete"
              onClick={() => editModal.current.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
      {/* Delete Modal Designated Below*/}
      <dialog
        className="__delete-modal__ bg-red-400/90 p-10 font-bold rounded border border-white"
        ref={deleteModal}
      >
        <div>Are you sure you want to delete this comment?</div>
        <div className="__btn-container__ flex justify-around mt-6">
          <button
            className="btn-edit px-6"
            onClick={(event) => {
              deleteComment(event, editComment.id);
            }}
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
      <div className="__post-details-container__ flex flex-col items-center w-7/12">
        <label className="__post-details-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center rounded-t-lg">
          {post.title} Comments:
        </label>
        <form>RESERVED FOR NEW COMMENT FORM, HI PAOLO!</form>
        <div className="__post-details-list__ bg-cyan-950/60 border border-white/40 py-20 rounded-lg self-center w-9/12 flex flex-wrap p-4">
          {post.comments?.map((obj) => {
            return (
              <div
                className="__comment-container__ bg-sky-600/80 w-max px-20 py-4 rounded-md"
                key={obj.id}
              >
                <div className="__modal-button-container__ ">
                  <button
                    onClick={() => {
                      setEditComment(obj);
                      editModal.current.showModal();
                    }}
                    className="btn-edit"
                  >
                    <img src={editButton} />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => {
                      setEditComment(obj);
                      deleteModal.current.showModal();
                    }}
                  >
                    <img src={deleteButton} />
                  </button>
                </div>
                <div className="text-white text-lg mb-2">{obj.content}</div>

                <div className="text-gray-600">
                  - {obj.author.user.author_name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
