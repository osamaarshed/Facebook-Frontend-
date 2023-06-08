import React, { useEffect } from "react";
import Chats from "../../Components/Chats";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages } from "../../ReduxToolkit/store/messagesSlices/showMessageSlice";
import { Spin } from "antd";
import SearchFriends from "../../Components/SearchFriends";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";
const socket = io.connect(`${process.env.REACT_APP_API}`);

const Messages = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);
  let senderName = "";
  let _id = "";

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, []);

  const messages = useSelector((state) => {
    return state.messages;
  });
  return (
    <div>
      <h1>Messages</h1>
      <SearchFriends socket={socket} />

      {messages.isLoading ? (
        <>
          <Spin className="spinner" />
        </>
      ) : (
        messages?.value?.map((object, i) => {
          return (
            <div key={i}>
              {object.participants.forEach((user) => {
                if (user._id === decodedToken._id) {
                  _id = user._id;
                  senderName = user.name;
                }
              })}
              <Chats
                socket={socket}
                participant2={object.participants[1]._id}
                room={object.chatRoomId}
                name={object.participants.map((user) => {
                  if (user._id !== decodedToken._id) return user.name;
                })}
                senderName={{ name: senderName, _id: _id }}
                msg={object.messages}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Messages;
