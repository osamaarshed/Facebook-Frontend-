import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import PostCard from "../../Components/PostCard";
import { Col, Row } from "antd";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  // const [handleError, setHandleError] = useState();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const getPosts = async () => {
      try {
        const posts = await axios({
          method: "get",
          url: "http://localhost:8080/posts/",
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(posts.data.post);
        setPosts(posts.data.post);
      } catch (error) {
        // console.log(error);
        if (error.response && error.response.status === 404) {
          console.log("Not Found");
        } else {
          console.error(error.message);
        }
      }
    };
    getPosts();
  }, []);
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

export default MyPosts;