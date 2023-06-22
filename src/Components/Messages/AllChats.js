import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Divider } from "antd";
import { List, Spin } from "antd";
import jwt_decode from "jwt-decode";
import { setSelectedId } from "../../ReduxToolkit/store/messagesSlices/selectedIdSlice";

const AllChats = ({ socket, messages }) => {
  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);
  const dispatch = useDispatch();
  let senderName = "";
  let recieverName = "";
  let id = "";

  const joinRoom = (payload) => {
    socket.emit("join_room", payload);
  };

  useEffect(() => {
    console.log("All Chats: ");
  }, []);
  return (
    <div>
      {messages.isLoading ? (
        <>
          <Spin className="spinner" />
        </>
      ) : (
        <List itemLayout="horizontal">
          {messages?.value?.map((item, i) => {
            item.participants.forEach((user) => {
              if (user._id !== decodedToken._id) {
                id = user._id;
                recieverName = user.name;
              } else if (user._id === decodedToken._id) {
                senderName = user.name;
              } else {
              }
            });

            return (
              <div key={i}>
                <List.Item
                  className="AllChats-listItem"
                  onClick={() => {
                    joinRoom(item.chatRoomId);
                    dispatch(setSelectedId(item.chatRoomId));
                  }}
                >
                  {i + 1}
                  <Divider type="vertical" />
                  <List.Item.Meta
                    className="allchats-listitemMeta"
                    title={recieverName}
                    description={`Last Message: ${
                      item.messages[item.messages.length - 1].text
                    }`}
                  />
                </List.Item>
              </div>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default AllChats;
