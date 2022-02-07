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