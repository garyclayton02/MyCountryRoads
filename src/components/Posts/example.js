// post card
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




//==========================
//post form

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


//==================================
//post list
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { PostCard } from "./PostCard"


import "./Post.css"

export const PostList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { posts, getPosts } = useContext(PostContext)


  useEffect(() => {
    console.log("PostList: useEffect - getPosts")
    getPosts()
    .then(getPosts)

  }, [])

  const navigate = useNavigate()

/* this is the basis of reperesntation for the message board. What you will
see on the message board is 'described' here by the items listed and where
they are placed. */
  return (
    <>
    
        <h2>Posts</h2>
		<button onClick={() => {navigate("/posts/edit/create")}}>
            Add Post
        </button>
        <div className="post">
      {console.log("PostList: Render", posts)}
      {
        posts.map(post => {
          return <PostCard key={post.id} post={post} />
        })
      }
    </div>
    </>
  )
}

//====================================================
//post provider
import React, { useState, createContext } from "react"

export const PostContext = createContext()

/* PostContext is the data that is being exported - it's like
an empty file that gets filled with data*/

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8088/posts?_expand=user")
        .then(res => res.json())
        .then(setPosts)
    }
/*below is where our content is created - the POST method 
 - this is kinda where what we enter ends up in the API */
    const addPost = postObj => {
        return fetch("http://localhost:8088/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
        })
        .then(response => response.json())
        // .then(getPosts)
    }

    /* ----------------------------------------------------------
    this is where deletePosts is located------------------------*/
    const deletePosts = id => {
        return fetch(`http://localhost:8088/posts/${id}`, {
            method: "DELETE"
        }).then(getPosts)
        
    }
    const getPostById = (id) => {
        return fetch(`http://localhost:8088/posts/${id}`)
        .then(response => response.json())
    }

    const updatePost = post => {
        return fetch(`http://localhost:8088/posts/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(post)
        })
          .then(getPosts)
      }

    

    /* below we are making a PostContextProvider - has data for 
    posts, getPosts, and addPosts - AND FOR EDIT POSTS - return function
    */
    return (
        <PostContext.Provider value={{
            posts, getPosts, addPost, deletePosts, updatePost, getPostById
        }}>
            {props.children}
        </PostContext.Provider>
    )
}