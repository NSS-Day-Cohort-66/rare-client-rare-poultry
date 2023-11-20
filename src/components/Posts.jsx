import { useEffect, useState } from "react"
import { postService } from "../services/postService"


export const Posts = () => {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        postService().then((postsArray) => {
            setAllPosts(postsArray)
        })
    }, [])


    return (
        <div>
            <label className="text-xl underline font-bold">Posts</label>
            <ul>
                {allPosts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>Author:{post.authorName}</p>
                        <p>Category:{post.categoryName}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}