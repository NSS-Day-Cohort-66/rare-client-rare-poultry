import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { categoryService } from "../services/categoryService"
import { postServiceById } from "../services/postService"

export const EditPost = () => {
    const [category, setCategory] = useState([])
    const [chosenCategory, setChosenCategory] = useState('')
    const [editedPost, setEditedPost] = useState({
        title: "",
        image_url: "",
        content: "",
        tags: []
    })

    const { postId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchCategories = async () => {
         const categoriesData = await categoryService();
         setCategory(categoriesData);
        }

        fetchCategories()
    }, [postId])
       
    useEffect(() => {
        const fetchPost = async () => {
         if (postId) {
           const postInfo = await postServiceById(postId);
           setEditedPost({
             title: postInfo.title,
             image_url: postInfo.image_url,
             content: postInfo.content,
             user: postInfo.user.id,
             approved: postInfo.approved
           });
           const matchedCategory = category.find(cat => cat.label === postInfo.category_name)
           if (matchedCategory) {
             setChosenCategory(matchedCategory.id);
           }
         }
        }

        if (category.length > 0) {
            fetchPost()
        }
       }, [postId, category]);
       

    const handleInputChange = (event) => {
        if (event.target.name === 'category') {
            setChosenCategory(event.target.value)
        } else (
            setEditedPost({ ...editedPost, [event.target.name]: event.target.value })
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const postData = {
            ...editedPost,
            category: chosenCategory,
            user: editedPost.user,
            approved: editedPost.approved
        }

        console.log("Sending PUT Request with data:", postData)


        try {
            const response = await fetch(`http://localhost:8000/posts/${postId}`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("rare_token")).token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            });

            if (response.ok) {
                navigate(`/posts/${postId}`)
            } else {
                console.error('Failed to update post:', await response.text())
            }
        } catch (error) {
            console.error('Error during PUT request:', error)
        }
    }

    const handleCancel = () => {
        navigate("/posts")
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 w-9/12 bg-sky-700/80 px-6 rounded-md border">
            <header>
                <div className="text-3xl font-bold text-white my-4">Edit Post</div>
            </header>
            <fieldset>
                <div>
                  <input
                    name="title"
                    placeholder="Title"
                    className="input-text w-[512px]"
                    value={editedPost.title}
                    type="text"
                    onChange={handleInputChange}
                  />
                </div>
            </fieldset>
            <fieldset>
                <div>
                  <input
                    name="image_url"
                    placeholder="Image URL"
                    value={editedPost.image_url}
                    className="input-text w-[512px]"
                    type="text"
                    onChange={handleInputChange}
                  />
                </div>
            </fieldset>
            <fieldset>
                <div>
                  <textarea
                    name="content"
                    className="input-text w-[512px] h-[128px]"
                    placeholder="Article Content"
                    value={editedPost.content}
                    onChange={handleInputChange}
                  />
                </div>
            </fieldset>
            <fieldset>
                <select
                  name="category"
                  onChange={handleInputChange}
                  className="rounded p-2 text-sm"
                  value={chosenCategory}
                >
                  <option value={0}>Category Select</option>
                  {category.map((catobj) => {
                    return (
                      <option key={catobj.id} value={catobj.id}>
                        {catobj.label}
                      </option>
                    );
                  })}
                </select>
            </fieldset>
            <div className="flex gap-2">
            <button type="submit" className="btn-edit bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Changes</button>
            <button type="button" onClick={handleCancel} className="btn-cancel bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-600">Cancel</button>
            </div>
        </form>
  );
 }