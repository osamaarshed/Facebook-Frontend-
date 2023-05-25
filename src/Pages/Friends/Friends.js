import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
// import Navbar from "../../Components/Navbar";
import {
  UserAddOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Card, Button, Space, message } from "antd";
import "../../Css/Friends.css";
import jwt_decode from "jwt-decode";
import {
  // fetchFriends,
  findFriends,
  sendRequest,
  deleteFriend,
} from "../../Api";
import { fetchAllFriends } from "../../ReduxToolkit/store/friendsSlices/ShowFriendsSlice";
const { Search } = Input;

const Friends = () => {
  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);
  const [response, setResponse] = useState();
  // const [friendResponse, setFriendResponse] = useState();
  const [sentRequest, setSentRequest] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useDispatch();

  const friends = useSelector((state) => {
    return state.friends.value;
  });

  useEffect(() => {
    showFriends();
  }, [isDeleted]);

  const showFriends = () => {
    try {
      dispatch(fetchAllFriends());
      // const res = await fetchFriends();
      // setFriendResponse(res);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  const onSearch = async (value) => {
    try {
      const res = await findFriends(value);
      if (res.data[0]?.friendRequests.includes(decodedToken._id)) {
        setSentRequest(true);
      } else if (res.data[0]?.friends.includes(decodedToken._id)) {
        setIsFriend(true);
      } else {
        setSentRequest(false);
        setIsFriend(false);
      }
      setResponse(res.data);
      console.log(res.data);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  const handleSendRequest = async (friendId) => {
    const payload = {
      friendId: friendId,
    };
    try {
      const res = await sendRequest(payload);
      message.success("Request Sent");
      console.log(res.data.message);
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  const handleDeleteFriend = async (friendId) => {
    try {
      const res = await deleteFriend(friendId);
      message.success(res.data.message);
      setIsDeleted(true);
      console.log(res.data);
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <div>
      {/* <Navbar /> */}
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
                          handleSendRequest(object._id);
                          setSentRequest(true);
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
          {friends?.map((object, i) => {
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
