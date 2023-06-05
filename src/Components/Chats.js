import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Button, Modal, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
// import io from "socket.io-client";
import { saveMessages } from "../Api";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages } from "../ReduxToolkit/store/messagesSlices/showMessageSlice";
// const socket = io.connect(`${process.env.REACT_APP_API}`);

const Chats = ({ socket, name, time, msg, room, participant2 }) => {
  const [modal2Open, setModal2Open] = useState(false);
  const [inputData, setInputData] = useState("");
  //   const [message, setMessage] = useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);
  const joinRoom = (payload) => {
    socket.emit("join_room", payload);
  };
  const sendMessage = async () => {
    const payload = {
      participant1: decodedToken._id,
      participant2: participant2,
      messageOwner: decodedToken,
      chatRoomId: room,
      text: inputData,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send_message", payload);
    // const saveMessage = async () => {
    //   const res = await saveMessages(
    //     room,
    //     participant2,
    //     decodedToken._id,
    //     inputData,
    //     payload.time
    //   );
    //   console.log("response of Chats", res);
    // };
    // saveMessage();
    // setMessage((e) => [...e, payload]);
  };

  //   const fetchMessages = () => {
  //     dispatch(fetchAllMessages());
  //   };

  //   const messages = useSelector((state) => {
  //     return state.messages.value;
  //   });
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log("data recieved", data);
      //   setMessage((e) => [...e, data]);
      //   fetchMessages();
    });
  }, []);
  return (
    <div>
      <Card
        style={{
          marginTop: "5%",
          marginLeft: "10%",
          marginRight: "10%",
          marginBottom: "2%",
        }}
        type="inner"
        title={name}
        hoverable={true}
      >
        {msg?.map((object) => {
          return object.text;
        })}
        <Button
          className="chats-sendButton"
          type="primary"
          shape="circle"
          onClick={() => {
            joinRoom(room);
            setModal2Open(true);
          }}
        >
          <SendOutlined />
        </Button>
        <Modal
          className="chats-modal"
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        >
          <div className="chats-modalChatHeader">
            <h2>Chat Box</h2>
          </div>
          <div className="chats-modalChatBody">
            {/* {messages?.map((object, i) => {
              return (
                <React.Fragment key={i}>
                  {object.chatRoomId === room ? (
                    object.messages?.map((msg, i) => {
                      return (
                        <React.Fragment key={i}>
                          <div
                            id={
                              msg.sentBy._id === decodedToken._id
                                ? "me"
                                : "other"
                            }
                          >
                            <p>
                              <b>{msg?.text}</b>
                            </p>
                            <p>
                              <span className="chats-modalChatBody-time">
                                {msg?.timeStamp}
                              </span>
                              <span className="chats-modalChatBody-name">
                                {msg?.sentBy.name}
                              </span>
                            </p>
                          </div>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              );
            })} */}
          </div>
          <div className="chats-modalChatFooter">
            <Input
              placeholder="Message..."
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
            <Button type="primary" shape="circle" onClick={sendMessage}>
              <SendOutlined />
            </Button>
          </div>
        </Modal>
      </Card>
    </div>
  );
};

export default Chats;
