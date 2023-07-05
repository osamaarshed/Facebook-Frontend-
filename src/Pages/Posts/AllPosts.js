import React, { useEffect, useState } from "react";
import PostCard from "../../Components/PostCard";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsData } from "../../ReduxToolkit/store/PostSlices/AllPostsSlice";
import { useOutletContext } from "react-router-dom";
import { Spin } from "antd";
import { fetchMyPostsData } from "../../ReduxToolkit/store/PostSlices/MyPostsSlice";

const AllPosts = () => {
  const [page, setPage] = useState(0);
  const activekey = useOutletContext();

  const dispatch = useDispatch();
  const showAllPosts = () => {
    dispatch(fetchAllPostsData(page));
  };

  const showPosts = async () => {
    dispatch(fetchMyPostsData());
  };

  const data = useSelector((state) => {
    return state.post;
  });

  const myData = useSelector((state) => {
    return state.myposts;
  });

  const render = useSelector((state) => {
    return state.render.value;
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
    showPosts();
  }, [render]);
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);
  return (
    <>
      {activekey === "myposts" ? (
        myData.isLoading ? (
          <>
            <Spin className="spinner" />
          </>
        ) : (
          <div
            style={{
              backgroundColor: "#f0f0f0",
            }}
          >
            {myData?.value?.map((object, i) => {
              return (
                <Row key={i}>
                  <Col span={12} offset={6}>
                    <PostCard
                      component="myposts"
                      inputFile={object.inputFile}
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
        )
      ) : data?.isLoading ? (
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
