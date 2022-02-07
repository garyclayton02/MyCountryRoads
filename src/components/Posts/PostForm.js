
import { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import "./Post.css"
import { useNavigate, useParams, useResolvedPath } from "react-router-dom";
import React from "react";






export const PostForm = () => {


    const { addPost, getPostById, updatePost } = useContext(PostContext)
    const { deletePosts} = useContext(PostContext)
    const { getPosts, } = useContext(PostContext)
    const { isLoading, setIsLoading} = useState(true);

const [posts, setPost] = useState ({})

/* below is a new const for edit*/
const {postId} = useParams();

/*this is where i will be adding code for deleting a post
------------------------------------------------------*/

const navigate = useNavigate()

const handleRelease = () => {
    deletePosts(posts.id)
      .then(() => {
        navigate("/posts")
      })
  }

const handleControlledInputChange = (event) => {

const newPost = { ...posts }
newPost[event.target.id] = event.target.value
setPost(newPost)
}
//from Steve

//-----------------------------------------





const   handleSavePost = () => {
    
    if (parseInt(posts.commentId)=== 0) {
        window.alert("text")
    } else {
        
        if (postId) {
            updatePost ({
        
                comment: posts.comment,
                userId: +localStorage.roads_user,
                id: posts.id

            }
            )
            .then(() => navigate("/posts"))
            } else {
                addPost(
                    {
                comment: posts.comment,
                userId: +localStorage.roads_user,
                // userId: posts.userId,
                id: posts.id
                    }
                )
                .then(() => navigate("/posts"))
            }
        }
    }







useEffect(() => {
    getPosts().then(() => {
      if (postId){
        getPostById(postId)
        .then(post => {
            setPost(post)
  
        })
      } else {

      }
    })
  }, [])


  // on input line, the "value " component must match with the route in application view - sometimes listed as default value
return (
    <form className="postForm">
        <h2 className="postForm_title">New Post</h2>
        <fieldset>
            <div className="form-post">
                <label htmlFor="post">Create Post</label>
                <input type="text" id="comment" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Post Comment" value={posts.comment}/>
                
            </div>
        </fieldset>
        
        <button className="btn btn-primary"
        
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSavePost()
          }}>
        {postId ? <>Edit Comment</> : <>Add a Comment</>}</button>
    </form>
)
}
