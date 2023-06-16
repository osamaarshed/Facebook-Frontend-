import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { List, Spin } from "antd";
import jwt_decode from "jwt-decode";
import { updateValues } from "../../ReduxToolkit/store/messagesSlices/AllMessagesSlice";

const AllChats = ({ socket, messages }) => {
  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);
  const dispatch = useDispatch();
  let senderName = "";
  let recieverName = "";
  let id = "";

  const setStates = (room, msg, senderName, participant2) => {
    const payload = {
      room: room,
      msg: msg,
      senderName: senderName,
      participant2: participant2,
    };
    dispatch(updateValues(payload));
  };
  const joinRoom = (payload) => {
    socket.emit("join_room", payload);
  };

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
                    setStates(
                      item.chatRoomId,
                      item.messages,
                      item.senderName,
                      id
                    );
                  }}
                >
                  {i + 1}
                  <List.Item.Meta
                    className="allchats-listitemMeta"
                    title={recieverName}
                    description={item.messages[item.messages.length - 1].text}
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
