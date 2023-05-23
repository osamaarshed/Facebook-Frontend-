import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
// import axios from "axios";
import PostCard from "../../Components/PostCard";
import { Col, Row } from "antd";
import { getAllPosts } from "../../Api";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [render, setStateRender] = useState(false);
  const token = localStorage.getItem("jwt");

  const showAllPosts = async () => {
    const res = await getAllPosts();
    setPosts(res);
  };
  useEffect(() => {
    if (token) {
      showAllPosts();
    }
  }, [token, render]);
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#f0f0f0",
        }}
      >
        {posts?.map((object, i) => {
          return (
            <Row key={i}>
              <Col span={12} offset={6}>
                <PostCard
                  inputFile={object.inputFile}
                  render={render}
                  setStateRender={(e) => setStateRender(e)}
                  postId={object._id}
                  likeCount={object.likesCount}
                  cardDescription={object.postDescription}
                  cardTitle={object.userId.name}
                />
              </Col>
            </Row>
          );
        })}
      </div>
    </>
  );
};

export default AllPosts;
