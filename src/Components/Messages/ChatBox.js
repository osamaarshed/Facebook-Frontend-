import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePage } from "../../ReduxToolkit/store/messagesSlices/SetPageSlice";

const ChatBox = ({ decodedToken, message, msg, firstMessageSend }) => {
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const handleInfiniteScroll = () => {
    // console.log(
    //   "scrollHeight: ",
    //   document.getElementById("chatBox").scrollHeight
    // );
    // console.log("scrollTop: ", document.getElementById("chatBox").scrollTop);
    // console.log(
    //   "innerHeight: ",
    //   document.getElementById("chatBox").clientHeight
    // );
    if (document.getElementById("chatBox").scrollTop <= 0) {
      dispatch(updatePage());
    }
  };
  // useEffect(() => {
  //   document.addEventListener("scroll", handleInfiniteScroll);
  //   return () => {
  //     document.removeEventListener("scroll", handleInfiniteScroll);
  //   };
  // }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    // <div className="chatBox-container">
    <div
      onScroll={() => {
        handleInfiniteScroll();
      }}
      id="chatBox"
      className="chats-modalChatBody"
    >
      {firstMessageSend
        ? message?.map((msg, i) => {
            return (
              <React.Fragment key={i}>
                <div id={msg.sentBy?._id === decodedToken._id ? "me" : "other"}>
                  <p className="Chats-msg-text">{msg.text}</p>
                  <p>
                    <span className="Chats-msg-senderName">
                      Sent By: {msg.sentBy?.name}
                    </span>
                    <span className="Chats-msg-time">{msg.timeStamp}</span>
                  </p>
                </div>
                <div ref={messagesEndRef} />
              </React.Fragment>
            );
          })
        : msg?.map((object, i) => {
            return (
              <React.Fragment key={i}>
                <div
                  id={object.sentBy._id === decodedToken._id ? "me" : "other"}
                >
                  <p className="Chats-msg-text">{object.text}</p>
                  <p>
                    <span className="Chats-msg-senderName">
                      Sent By: {object.sentBy.name}
                    </span>
                    <span className="Chats-msg-time">{object.timeStamp}</span>
                  </p>
                </div>
                <div ref={messagesEndRef} />
              </React.Fragment>
            );
          })}
    </div>
    // </div>
  );
};

export default ChatBox;
