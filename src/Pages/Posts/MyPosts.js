import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import PostCard from "../../Components/PostCard";
import { Col, Row } from "antd";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [render, setStateRender] = useState(false);
  // const [handleError, setHandleError] = useState();
  const token = localStorage.getItem("jwt");
  const getPosts = async () => {
    try {
      const posts = await axios({
        method: "get",
        url: "http://localhost:8080/posts/",
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(posts.data.post);
      console.log(posts.data.post);
      setPosts(posts.data.post);
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.status === 404) {
        console.log("Not Found");
      } else {
        console.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    if (token) {
      getPosts();
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
