import React, { useEffect, useRef } from "react";
import { Layout } from "antd";
import SearchFriends from "../../Components/SearchFriends";
import io from "socket.io-client";
import MessagesSider from "../../Components/MessagesSider";
import AllChats from "../../Components/Messages/AllChats";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages } from "../../ReduxToolkit/store/messagesSlices/showMessageSlice";

const socket = io.connect(`${process.env.REACT_APP_API}`);
const { Sider, Content } = Layout;

const Messages = () => {
  // const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const messagesData = useSelector((state) => {
    return state.allmessages.value;
  });

  const page = useSelector((state) => {
    return state.setpages.value;
  });
  const messages = useSelector((state) => {
    return state.messages;
  });

  useEffect(() => {
    console.log("Page: ", page);
    dispatch(fetchAllMessages(page));
  }, [page]);
  // console.log("efect");

  return (
    <div className="messages-container">
      <h1>Messages</h1>
      <SearchFriends socket={socket} />
      <Layout hasSider className="messages-layout">
        <Content className="messages-content">
          <AllChats socket={socket} messages={messages} />
        </Content>
        {messagesData ? (
          <Sider theme="light" width={600} className="messages-sider">
            <MessagesSider socket={socket} />
          </Sider>
        ) : (
          ""
        )}
      </Layout>
    </div>
  );
};

export default Messages;
