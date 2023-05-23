import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Card, Button, Space } from "antd";
import { fetchFriendRequests, handleRequest } from "../../Api";

const FriendRequests = () => {
  const [friendRequest, setfriendRequest] = useState([]);
  const [requestStatus, setRequestStatus] = useState();
  useEffect(() => {
    showFriendRequests();
  }, [requestStatus]);

  const showFriendRequests = async () => {
    const res = await fetchFriendRequests();
    setfriendRequest(res);
    console.log("hello", res);
  };
  return (
    <div>
      <Navbar />
      <h1>FriendRequests</h1>
      <div>
        {friendRequest?.map((object) => {
          return (
            <>
              <Card
                title={object.name}
                bordered={false}
                style={{
                  width: 300,
                  backgroundColor: "#d9d9d9",
                  marginLeft: "20%",
                }}
              >
                <Space>
                  <Button
                    type="primary"
                    onClick={async () => {
                      const res = await handleRequest("accept", object._id);
                      setRequestStatus(res);
                    }}
                    icon={<CheckOutlined />}
                  >
                    Accept
                  </Button>
                  <Button
                    type="primary"
                    onClick={async () => {
                      const res = await handleRequest("reject", object._id);
                      setRequestStatus(res);
                    }}
                    danger
                    icon={<CloseOutlined />}
                  >
                    Reject
                  </Button>
                </Space>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default FriendRequests;
