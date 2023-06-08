import React, { useState, useEffect } from "react";
import { Card, Form } from "antd";
import { Button, Modal, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";

const Chats = ({ socket, name, time, msg, room, participant2, senderName }) => {
  const [modal2Open, setModal2Open] = useState(false);
  const [inputData, setInputData] = useState("");
  const [message, setMessage] = useState([]);
  const [firstMessageSend, setFirstMessageSend] = useState(false);

  const [form] = Form.useForm();
  const lastMessage = msg[msg.length - 1];
  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);
  const joinRoom = (payload) => {
    socket.emit("join_room", payload);
  };
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
      setMessage(data.messages);
    });
  };

  useEffect(() => {
    recieveMessage();
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
        <div className="Chats-card-message">
          <p>
            <b>Last Message: </b> {lastMessage.text}
          </p>
          <p>
            <b>Sent By: </b>
            {lastMessage.sentBy.name}
          </p>
        </div>
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
          style={{
            backgroundColor: "pink",
          }}
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
            {firstMessageSend
              ? message?.map((msg, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div
                        id={
                          msg.sentBy?._id === decodedToken._id ? "me" : "other"
                        }
                      >
                        <p className="Chats-msg-text">{msg.text}</p>
                        <p>
                          <span className="Chats-msg-senderName">
                            Sent By: {msg.sentBy?.name}
                          </span>
                          <span className="Chats-msg-time">
                            {msg.timeStamp}
                          </span>
                        </p>
                      </div>
                    </React.Fragment>
                  );
                })
              : msg.map((object, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div
                        id={
                          object.sentBy._id === decodedToken._id
                            ? "me"
                            : "other"
                        }
                      >
                        <p className="Chats-msg-text">{object.text}</p>
                        <p>
                          <span className="Chats-msg-senderName">
                            Sent By: {object.sentBy.name}
                          </span>
                          <span className="Chats-msg-time">
                            {object.timeStamp}
                          </span>
                        </p>
                      </div>
                    </React.Fragment>
                  );
                })}
          </div>
          <div className="chats-modalChatFooter">
            <Form
              className="chats-message-form"
              form={form}
              onFinish={onFinish}
            >
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
        </Modal>
      </Card>
    </div>
  );
};

export default Chats;
