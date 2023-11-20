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
                        <p>Author:{post.author.author_name}</p>
                        <p>Category:{post.category_name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}