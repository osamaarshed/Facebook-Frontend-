// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import PostCard from "./PostCard";
// import { Col, Row } from "antd";

// const DisplayPosts = () => {
//   const data = useSelector((state) => {
//     console.log(state.post, "selector state");
//     return state.post;
//   });
//   //   const [render, setStateRender] = useState(false);
//   console.log("dataaaa", data);
//   return (
//     <div>
//       {/* {data?.map((object, i) => {
//         return (
//           <Row key={i}>
//             <Col span={12} offset={6}>
//               <PostCard
//                 inputFile={object.inputFile}
//                 render={render}
//                 setStateRender={(e) => setStateRender(e)}
//                 postId={object._id}
//                 likeCount={object.likesCount}
//                 cardDescription={object.postDescription}
//                 cardTitle={object.userId.name}
//               />
//             </Col>
//           </Row>
//         );
//       })} */}
//     </div>
//   );
// };

// export default DisplayPosts;
