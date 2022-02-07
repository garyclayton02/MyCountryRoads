import { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import "./Post.css"
import { useNavigate, useParams } from "react-router-dom";
import React from "react";






export const PostForm = () => {


    const { addPost, getPostById, updatePost } = useContext(PostContext)
    const { deletePosts} = useContext(PostContext)
    const { getPosts, } = useContext(PostContext)
    const { isLoading, setIsLoading} = useState(true);

const [post, setPost] = useState ({
    
    comment: "", 
    userID: 0
})

/* below is a new const for edit*/
const {postsID} = useParams();

/*this is where i will be adding code for deleting a post
------------------------------------------------------*/

const navigate = useNavigate()

const handleRelease = () => {
    deletePosts(post.id)
      .then(() => {
        navigate("/posts")
      })
  }

const handleControlledInputChange = (event) => {

const newPost = { ...post }
newPost[event.target.id] = event.target.value
setPost(newPost)
}
//from Steve


const handleClickSavePost = (event) => {
    event.preventDefault()
    const postsID = parseInt(post.id)
    if (postsID === 0) {
        window.alert("Please make a post")
    } else {
        addPost(post)
        .then(() => navigate("/posts"))
    }
}
// const handleSavePost = () => {
//     setIsLoading(true);
//     if (postId) {
//         updatePost({
//             comment: "",
//             userID: 0
//         })
//         .then(() => navigate(`posts/${post.id}`))
//     } else {
//         postPost(
//             {
//                 comment: "",
//                 userID: 0
//             })
//             .then(() => navigate(`posts/${post.id}`))
//     }





useEffect(() => {
    getPosts().then(() => {
      if (postsID){
        getPostById(postsID)
        .then(post => {
            setPost(post)
            setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

return (
    <form className="postForm">
        <h2 className="postForm_title">New Post</h2>
        <fieldset>
            <div className="form-post">
                <label htmlFor="post">Create Post</label>
                <input type="text" id="comment" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Post Comment" value={post.comments}/>
            </div>
        </fieldset>
        {/* <fieldset>
                <input type="text" id="comment" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Post Comment" value={post.comments}/>
                
        </fieldset> */}
        <button className="btn btn-primary"
        onClick={handleClickSavePost}>
            Save Post
        </button>
    </form>
)
}