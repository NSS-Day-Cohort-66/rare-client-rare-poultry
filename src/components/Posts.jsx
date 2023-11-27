import { useEffect, useState } from "react"
import { postService } from "../services/postService"
import { Link } from "react-router-dom"


export const Posts = () => {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        postService().then((postsArray) => {
            setAllPosts(postsArray)
        })
    }, [])


    return (
        <div className="__posts-container__ flex flex-col w-7/12">
            <label className="__posts-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center rounded-t-lg">Posts</label>
            <div className="__posts-list__ bg-cyan-950/60 border border-white/40 py-20 rounded-lg self-center">
            <ul className="list-none">
                {allPosts.map(post => (
                    <li key={post.id} className="border-b border-white/40 last:border-b-0 p-4">
                        <h2 className="text-xl font-bold mb-2">
                            <Link to={`/posts/${post.id}`} className="text-teal-400 hover:text-blue-700 underline"
                            >{post.title}</Link>
                        </h2>
                        <p className="text-white"><span className="font-bold">Author:</span> {post.user.user.author_name}</p>
                        <p className="text-white"><span className="font-bold">Category:</span> {post.category_name}</p>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}