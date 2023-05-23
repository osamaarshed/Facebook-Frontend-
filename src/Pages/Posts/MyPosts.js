import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import PostCard from "../../Components/PostCard";
import { getPosts } from "../../Api";
import { Col, Row } from "antd";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [render, setStateRender] = useState(false);
  const token = localStorage.getItem("jwt");

  const showPosts = async () => {
    const res = await getPosts();
    setPosts(res);
  };
  useEffect(() => {
    if (token) {
      showPosts();
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

export default MyPosts;
