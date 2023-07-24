import React, { useEffect } from "react";
import { Divider, Layout } from "antd";
import SearchFriends from "../../Components/Messages/SearchFriends";
import io from "socket.io-client";
import MessagesSider from "../../Components/Messages/MessagesSider";
import AllChats from "../../Components/Messages/AllChats";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages } from "../../ReduxToolkit/store/messagesSlices/showMessageSlice";
import { animated, useSpring } from "@react-spring/web";
import { fetchSpecificMessages } from "../../ReduxToolkit/store/messagesSlices/showSpecifcChatsSlice";

const socket = io.connect("http://localhost:8083/");
// const socket = io.connect(`${process.env.SOCKET_IO}`);
const { Sider, Content } = Layout;

const Messages = () => {
  const dispatch = useDispatch();

  const messages = useSelector((state) => {
    return state.messages;
  });

  const selectedId = useSelector((state) => {
    return state.selectedId.value;
  });

  const page = useSelector((state) => {
    return state.setpages.value;
  });

  const animation = useSpring({
    x: selectedId ? 0 : 100,
    config: {
      mass: 3,
    },
  });

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, []);

  useEffect(() => {
    if (selectedId) {
      const payload = {
        selectedId: selectedId,
        page: page,
      };
      dispatch(fetchSpecificMessages(payload));
    }
  }, [selectedId, page]);

  return (
    <div className="messages-container">
      <h1 className="text-lg font-bold mb-8">Messages</h1>
      <SearchFriends socket={socket} />
      <Layout hasSider className="messages-layout">
        <Content className="messages-content">
          <AllChats socket={socket} messages={messages} />
        </Content>
        <Divider type="vertical" className="Messages-divider" />

        {selectedId ? (
          <animated.div style={animation}>
            <Sider theme="light" width={600}>
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
