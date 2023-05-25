import React, { useEffect } from "react";
import PostCard from "../../Components/PostCard";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchAllPostsData } from "../../ReduxToolkit/store/PostSlices/AllPostsSlice";
import { Spin } from "antd";

const AllPosts = () => {
  // const [render, setStateRender] = useState(false);
  const token = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const showAllPosts = () => {
    dispatch(fetchAllPostsData());
  };

  const data = useSelector((state) => {
    return state.post;
  });

  const renderData = useSelector((state) => {
    return state.render;
  });

  useEffect(() => {
    if (token) {
      showAllPosts();
    }
  }, [token, renderData]);
  return (
    <>
      {/* <Spin className="spinner" /> */}
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
                    <PostCard
                      inputFile={object.inputFile}
                      // render={render}
                      // setStateRender={(e) => setStateRender(e)}
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
      )}
    </>
  );
};

export default AllPosts;
