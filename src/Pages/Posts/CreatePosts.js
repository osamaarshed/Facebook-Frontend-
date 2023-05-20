import React from "react";

import Navbar from "../../Components/Navbar";
import CreatePostForm from "../../Components/CreatePostForm";
import "./../../Css/CreatePosts.css";
const CreatePosts = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f0f0",
        }}
      >
        <Navbar />

        <h1>Create Posts</h1>
        <div className="CreatePosts-form">
          <CreatePostForm />
        </div>
      </div>
    </>
  );
};

export default CreatePosts;
