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