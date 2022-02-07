import React, { useContext, useState } from "react"
import "./Post.css"
import { Navigate, useNavigate, } from "react-router-dom"
import { PostContext } from "./PostProvider"

/*this export will show up as written on ApplicationView*/
export const PostCard = ( {post }) => { 
    const { deletePosts } = useContext(PostContext)

    

    const navigate = useNavigate();
    


const handleRelease = () => {
    deletePosts(post.id)
      .then(() => {
        navigate("/posts") 
      })
    }


// export const PostCard = ( { post}) => 
    return(
    <section className="post">
        <h3 className="post_comment">{post.comment}</h3>
        <post className="post_user">{post.user?.name}</post>
        
        <button onClick={handleRelease}>Delete Post</button>
        <button onClick={() => {navigate(`/posts/edit/${post.id}`)}}>Edit Post</button>
    </section>
)
    }

/* the exported item will be what the user will see when 
they log into message board and click "post"*/




