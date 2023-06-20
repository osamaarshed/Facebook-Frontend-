import React, { useEffect, useState } from "react";
import PostCard from "../../Components/PostCard";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsData } from "../../ReduxToolkit/store/PostSlices/AllPostsSlice";
import { Spin } from "antd";

const AllPosts = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const showAllPosts = () => {
    dispatch(fetchAllPostsData(page));
  };
  const data = useSelector((state) => {
    return state.post;
  });

  const handleInfiniteScroll = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    showAllPosts();
  }, [page]);
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);
  return (
    <>
      {data?.isLoading ? (
        <>
          <Spin className="spinner" />
        </>
      ) : (
        <>
          <div id="allposts" className="allPost-container">
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
                        cardTitle={object.userId?.name}
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
