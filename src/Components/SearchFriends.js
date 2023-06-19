import React, { useState, useEffect } from "react";
import { Input, message, Card, Button, Modal } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { findFriends } from "../Api";
import jwt_decode from "jwt-decode";
const { Search } = Input;

const SearchFriends = ({ socket }) => {
  const [response, setResponse] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const [inputData, setInputData] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      // console.log("data recieved", data);
      // setMessages((e) => [...e, data]);
    });
  }, [socket]);

  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);

  const onSearch = async (value) => {
    try {
      const res = await findFriends(value);
      console.log(res.data);
      setResponse(res.data);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  const sendMessage = async () => {
    const randomString = generateRandomString(10);
    const chatRoomId = randomString;
    const participant2 = response[0]?._id;
    const messageOwner = decodedToken._id;
    const text = inputData;
    const time =
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();

    const payload = {
      chatRoomId: chatRoomId,
      participant1: messageOwner,
      participant2: participant2,
      messageOwner: messageOwner,
      text: text,
      time: time,
    };
    await socket.emit("send_new_message", payload);
    setMessages([...messages, { text: inputData }]);
    // setMessages((e) => [...e, payload]);
    // setMessages([...messages,])
    // setMessages([...messages, { sentBy: senderName, text: inputData }]);
  };
  const recieveMessage = () => {
    socket.on("recieve_new_message", (data) => {
      console.log("Recieved Data on Search Friends: ", data);
      setMessages(data.messages ? data.messages : []);
    });
  };
  useEffect(() => {
    recieveMessage();
  }, []);
  return (
    <div>
      <Search
        style={{ width: "80%" }}
        placeholder="Find Friends to Message"
        onSearch={onSearch}
        enterButton
      />
      <div>
        {response.length
          ? response?.map((object, i) => {
              return (
                <React.Fragment key={i}>
                  <div>
                    <Card
                      className="searchFriend-card"
                      type="inner"
                      title={object.name}
                      extra={
                        <Button
                          onClick={() => {
                            setModal2Open(true);
                          }}
                          type="primary"
                        >
                          Click to Start Chat
                        </Button>
                      }
                    ></Card>
                  </div>
                </React.Fragment>
              );
            })
          : ""}

        <Modal
          title="Chat"
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        >
          <div className="chats-modalChatHeader"></div>
          <div className="chats-modalChatBody">
            {messages?.map((object, id) => {
              return (
                <React.Fragment key={id}>
                  <div>
                    <p>{object.text}</p> <br />
                  </div>
                  <div>
                    <p>{object.time}</p>
                  </div>
                </React.Fragment>
              );
            })}
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
      </div>
    </div>
  );
};

export default SearchFriends;
