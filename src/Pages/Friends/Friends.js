import React, { useEffect, useState } from "react";
import { Input } from "antd";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import {
  UserAddOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Card, Button, Space, message } from "antd";
import "../../Css/Friends.css";
import jwt_decode from "jwt-decode";
const { Search } = Input;

const Friends = () => {
  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);
  const [response, setResponse] = useState();
  const [friendResponse, setFriendResponse] = useState();
  // const [isClicked, setisClicked] = useState(false);
  const [sentRequest, setSentRequest] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const showFriends = async () => {
      try {
        const friends = await axios({
          method: "GET",
          url: "http://localhost:8080/addfriends/",
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(friends.data.message);
        setFriendResponse(friends.data.message);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("Not Found");
        } else {
          console.error(error.message);
        }
      }
    };
    showFriends();
  }, []);

  const onSearch = async (value) => {
    await axios({
      method: "get",
      url: `http://localhost:8080/addfriends/${value}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data[0].friendRequests.includes(decodedToken._id)) {
          setSentRequest(true);
        } else if (res.data[0].friends.includes(decodedToken._id)) {
          setIsFriend(true);
        } else {
          setSentRequest(false);
          setIsFriend(false);
        }
        setResponse(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(value);
  };

  const handleFriendRequest = async (friendId) => {
    const payload = {
      friendId: friendId,
    };

    try {
      const friendRequest = await axios({
        method: "post",
        url: "http://localhost:8080/addfriends",
        headers: { Authorization: `Bearer ${token}` },
        data: payload,
      });
      // setisClicked(!isClicked);
      message.success("Request Sent");
      console.log(friendRequest.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteFriend = async (friendId) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/addfriends/${friendId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        message.success(res.data.message);
        // alert(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <div>
      <Navbar />
      <h1>Friends</h1>
      <Search
        style={{ width: "80%" }}
        placeholder="Enter Email"
        onSearch={onSearch}
        enterButton
      />
      <div>
        {response?.map((object) => {
          return (
            <>
              <div className="friends-card">
                <Card
                  title={object.name}
                  bordered={false}
                  style={{
                    width: 300,
                    backgroundColor: "#d9d9d9",
                  }}
                >
                  <Space>
                    {/* {!isClicked ? (
                      <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        // onClick={() => {
                        //   handleDeleteFriend(object._id);
                        // }}
                      >
                        Already Friend
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={() => {
                          handleFriendRequest(object._id);
                        }}
                      >
                        Add Friend
                      </Button>
                    )} */}
                    {sentRequest ? (
                      <Button type="primary">Already Sent</Button>
                    ) : isFriend ? (
                      <Button type="primary">
                        <CheckOutlined /> Already Friends
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => {
                          handleFriendRequest(object._id);
                        }}
                      >
                        <UserAddOutlined />
                        Send Request
                      </Button>
                    )}
                  </Space>
                </Card>
              </div>
            </>
          );
        })}
      </div>
      <h1>All Friends</h1>
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Id</th>
            <th>Remove</th>
          </tr>
          {friendResponse?.map((object, i) => {
            return (
              <>
                <tr key={i}>
                  <th>{object.name}</th>
                  <th>{object.email}</th>
                  <th>{object._id}</th>
                  <th>
                    <Button
                      danger
                      onClick={() => {
                        handleDeleteFriend(object._id);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </th>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Friends;
