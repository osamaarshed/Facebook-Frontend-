import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Card, Button, Space, message } from "antd";

const FriendRequests = () => {
  const token = localStorage.getItem("jwt");
  const [response, setResponse] = useState();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    axios({
      method: "GET",
      url: "http://localhost:8080/addfriends/requests",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        // console.log(res.data);
        setResponse(res.data.requests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRequest = async (status, friendId) => {
    const payload = {
      status: status,
      friendId: friendId,
    };
    try {
      const friendRequest = await axios({
        method: "post",
        url: "http://localhost:8080/addfriends/status",
        headers: { Authorization: `Bearer ${token}` },
        data: payload,
      });
      message.success("Friend Request " + status + "ed");
      console.log(friendRequest);
    } catch (err) {
      message.error(err.response.data.message);
      console.log(err.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <h1>FriendRequests</h1>
      <div>
        {/* {console.log(response)} */}
        {response?.map((object) => {
          return (
            <>
              <Card
                title={object.name}
                bordered={false}
                style={{
                  width: 300,
                  backgroundColor: "#d9d9d9",
                }}
              >
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleRequest("accept", object._id);
                    }}
                    icon={<CheckOutlined />}
                  >
                    Accept
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleRequest("reject", object._id);
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
