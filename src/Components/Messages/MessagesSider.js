import React, { useEffect, useState } from "react";
import { Button, Input, Form } from "antd";
import { useSelector } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import ChatBox from "./ChatBox";

const MessagesSider = ({ socket }) => {
  const [inputData, setInputData] = useState("");
  const [firstMessageSend, setFirstMessageSend] = useState(false);
  const [message, setMessage] = useState([]);

  const token = localStorage.getItem("jwt");
  const [form] = Form.useForm();
  const decodedToken = jwt_decode(token);
  let senderName = "";
  let recieverName = "";
  let participant2 = "";

  const [specificMessages] = useSelector((state) => {
    return state.specificMessages.value;
  });
  if (specificMessages) {
    specificMessages.participants.forEach((user) => {
      if (user._id !== decodedToken._id) {
        participant2 = user._id;
        recieverName = user.name;
      } else if (user._id === decodedToken._id) {
        senderName = user.name;
      }
    });
  }
  const room = specificMessages?.chatRoomId;
  const msg = specificMessages?.messages;

  const onFinish = () => {
    sendMessage();
  };

  const sendMessage = async () => {
    const payload = {
      participant1: decodedToken._id,
      participant2: participant2,
      messageOwner: decodedToken._id,
      chatRoomId: room,
      text: inputData,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send_message", payload);
    setMessage([...message, { sentBy: senderName, text: inputData }]);
    setFirstMessageSend(true);
    form.resetFields();
  };

  const recieveMessage = () => {
    socket.on("recieve_message", (data) => {
      console.log("Recieved Data on Message Sider: ", data);
      setMessage(data.messages);
    });
  };
  useEffect(() => {
    recieveMessage();
    console.log("MessagesSider: ");
  }, []);

  return (
    <>
      <div className="messagesSider-container">
        <ChatBox
          socket={socket}
          decodedToken={decodedToken}
          message={message}
          msg={msg}
          firstMessageSend={firstMessageSend}
        />
        <div className="chats-modalChatFooter">
          <Form className="chats-message-form" form={form} onFinish={onFinish}>
            <Form.Item
              name="message"
              rules={[
                {
                  message: "Message...",
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Message..."
                onChange={(e) => {
                  setInputData(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="chats-form-button"
                type="primary"
                shape="circle"
                htmlType="submit"
              >
                <SendOutlined />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default MessagesSider;
