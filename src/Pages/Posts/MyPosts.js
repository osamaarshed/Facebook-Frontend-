// import React, { useEffect } from "react";
// import PostCard from "../../Components/PostCard";
// import { Col, Row } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMyPostsData } from "../../ReduxToolkit/store/PostSlices/MyPostsSlice";
// import { Spin } from "antd";

// const MyPosts = () => {
//   const dispatch = useDispatch();

//   const showPosts = async () => {
//     dispatch(fetchMyPostsData());
//   };

//   const data = useSelector((state) => {
//     return state.myposts;
//   });

//   const render = useSelector((state) => {
//     return state.render.value;
//   });

//   useEffect(() => {
//     showPosts();
//   }, [render]);
//   return (
//     <>
//       {data.isLoading ? (
//         <>
//           <Spin className="spinner" />
//         </>
//       ) : (
//         <div
//           style={{
//             backgroundColor: "#f0f0f0",
//           }}
//         >
//           {data?.value?.map((object, i) => {
//             return (
//               <Row key={i}>
//                 <Col span={12} offset={6}>
//                   <PostCard
//                     component="myposts"
//                     inputFile={object.inputFile}
//                     postId={object._id}
//                     likeCount={object.likesCount}
//                     cardDescription={object.postDescription}
//                     cardTitle={object.userId.name}
//                   />
//                 </Col>
//               </Row>
//             );
//           })}
//         </div>
//       )}
//     </>
//   );
// };

// export default MyPosts;
