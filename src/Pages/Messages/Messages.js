import React, { useEffect } from "react";
import { Divider, Layout } from "antd";
import SearchFriends from "../../Components/SearchFriends";
import io from "socket.io-client";
import MessagesSider from "../../Components/MessagesSider";
import AllChats from "../../Components/Messages/AllChats";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages } from "../../ReduxToolkit/store/messagesSlices/showMessageSlice";
import { animated, useSpring } from "@react-spring/web";

const socket = io.connect(`${process.env.REACT_APP_API}`);
const { Sider, Content } = Layout;

const Messages = () => {
  const dispatch = useDispatch();

  const messages = useSelector((state) => {
    return state.messages;
  });
  const messagesData = useSelector((state) => {
    return state.allmessages.value;
  });
  const page = useSelector((state) => {
    return state.setpages.value;
  });
  const animation = useSpring({
    x: messagesData ? 0 : 100,
    config: {
      mass: 3,
    },
  });

  useEffect(() => {
    console.log("Page: ", page);
    dispatch(fetchAllMessages(page));
    // return () => {
    //   dispatch(updateValues(null));
    // };
  }, [page]);

  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <SearchFriends socket={socket} />
      <Layout hasSider className="messages-layout">
        <Content className="messages-content">
          <AllChats socket={socket} messages={messages} />
        </Content>
        <Divider type="vertical" className="Messages-divider" />
        {/* {messagesData ? (
          <Sider theme="light" width={600} className="messages-sider">
            <MessagesSider socket={socket} />
          </Sider>
        ) : (
          ""
        )} */}
        {messagesData ? (
          <animated.div style={animation}>
            <Sider theme="light" width={600} className="messages-sider">
              <MessagesSider socket={socket} />
            </Sider>
          </animated.div>
        ) : (
          ""
        )}
      </Layout>
    </div>
  );
};

export default Messages;
