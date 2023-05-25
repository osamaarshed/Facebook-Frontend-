import React, { useEffect } from "react";
import PostCard from "../../Components/PostCard";
import { useDispatch, useSelector } from "react-redux";
// import { getPosts } from "../../Api";
import { Col, Row } from "antd";
import { fetchMyPostsData } from "../../ReduxToolkit/store/PostSlices/MyPostsSlice";
import { Spin } from "antd";

const MyPosts = () => {
  // const [render, setStateRender] = useState(false);
  const token = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const showPosts = async () => {
    dispatch(fetchMyPostsData());
  };

  const data = useSelector((state) => {
    return state.myposts;
  });
  const renderData = useSelector((state) => {
    return state.render;
  });

  useEffect(() => {
    if (token) {
      showPosts();
    }
  }, [token, renderData]);
  return (
    <>
      {data.isLoading ? (
        <>
          <Spin className="spinner" />
        </>
      ) : (
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
      )}
    </>
  );
};

export default MyPosts;
