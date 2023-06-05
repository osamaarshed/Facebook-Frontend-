import React, { useEffect } from "react";
import PostCard from "../../Components/PostCard";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsData } from "../../ReduxToolkit/store/PostSlices/AllPostsSlice";
import { Spin } from "antd";


const AllPosts = () => {
  const dispatch = useDispatch();
  

  const showAllPosts = () => {
    dispatch(fetchAllPostsData());
  };

  const data = useSelector((state) => {
    return state.post;
  });

  useEffect(() => {
    showAllPosts();
  }, []);
  return (
    <>
      {data?.isLoading ? (
        <>
          <Spin className="spinner" />
        </>
      ) : (
        <>
          <div
            style={{
              backgroundColor: "#f0f0f0",
            }}
          >
            {data?.value?.map((object, i) => {
              return (
                <Row key={i}>
                  <Col span={12} offset={6}>
                    <div>
                      <PostCard
                        component="allposts"
                        inputFile={object.inputFile}
                        postId={object._id}
                        likeCount={object.likesCount}
                        cardDescription={object.postDescription}
                        cardTitle={object.userId.name}
                      />
                    </div>
                  </Col>
                </Row>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default AllPosts;
