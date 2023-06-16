// import React from "react";
// import { Card } from "antd";
// import { useDispatch } from "react-redux";
// import { updateValues } from "../../ReduxToolkit/store/messagesSlices/AllMessagesSlice";

// const Chats = ({ socket, name, msg, room, senderName, participant2 }) => {
//   const dispatch = useDispatch();
//   const lastMessage = msg[msg.length - 1];
//   const joinRoom = (payload) => {
//     socket.emit("join_room", payload);
//   };

//   const setStates = () => {
//     const payload = {
//       room: room,
//       msg: msg,
//       senderName: senderName,
//       participant2: participant2,
//     };
//     dispatch(updateValues(payload));
//   };

//   return (
//     <div>
//       <Card
//         onClick={() => {
//           joinRoom(room);
//           setStates();
//         }}
//         style={{
//           marginTop: "5%",
//           marginLeft: "10%",
//           marginRight: "10%",
//           marginBottom: "2%",
//         }}
//         type="inner"
//         title={name}
//         hoverable={true}
//       >
//         <div className="Chats-card-message">
//           <p>
//             <b>Last Message: </b> {lastMessage.text}
//           </p>
//           <p>
//             <b>Sent By: </b>
//             {lastMessage.sentBy.name}
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Chats;
