import { Route, Routes } from "react-router-dom";
import React from "react";
import { Register } from "./Auth/Register";
import { Login } from "./Auth/Login";
import { Logout } from "./Auth/Logout";
import { PostProvider } from "./Posts/PostProvider";
import { PostList } from "./Posts/PostList";
import { PostForm } from "./Posts/PostForm";






export const ApplicationViews = () => {

    return (
      <PostProvider>
        
        
        <Routes>
    
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="/logout" element={<Logout />} />
          <Route path="posts/*" element={<PostList />} />
          <Route path="posts/create/*" element={<PostForm />} />
          <Route path="posts/delete/*" element={<PostForm />} />
          <Route path="posts/edit/create" element={<PostForm />} />
          <Route path="posts/edit/:postId/*" element={<PostForm />} />
          
    
        
        
        </Routes>
        
      </PostProvider>
    
    );
  }