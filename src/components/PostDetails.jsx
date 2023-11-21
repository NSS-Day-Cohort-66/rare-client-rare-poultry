import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PostDetails = () => {
    const [post, setPost] = useState(null)
    const { postId } = useParams()

    useEffect(() => {
        const variable = JSON.parse(localStorage.getItem("rare_token"))
        const token = variable.token

        fetch(`http://localhost:8000/posts/${postId}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(postData => setPost(postData))
            .catch(error=> console.error('Error fetching post:', error))
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>{post.title}</h2>
            {post.image_url && <img src={post.image_url} />}
            <p>{post.content}</p>
            <p>Published on: {post.publication_date}</p>
            <p>Author: {post.author.author_name}</p>
        </div>
        )
    }