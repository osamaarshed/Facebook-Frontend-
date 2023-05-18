import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import PostCard from "../../Components/PostCard";
import { Col, Row } from "antd";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("jwt");
  const getPosts = async () => {
    try {
      const posts = await axios({
        method: "get",
        url: "http://localhost:8080/posts/all",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.data);
      console.log(posts.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Not Found");
      } else {
        console.error(error.message);
      }
    }
  };
  useEffect(() => {
    if (token) {
      getPosts();
    }
  }, [token]);
  return (
    <>
      <Navbar />
      <div>
        {posts?.map((object, i) => {
          return (
            <Row key={i}>
              <Col span={12} offset={6}>
                <PostCard
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
