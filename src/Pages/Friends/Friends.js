import React, { useEffect, useState } from "react";
import { Input } from "antd";
import Navbar from "../../Components/Navbar";
import axios from "axios";
import { UserAddOutlined } from "@ant-design/icons";
import { Card, Button, Space } from "antd";
import "../../Css/Friends.css";
const { Search } = Input;

const Friends = () => {
  const token = localStorage.getItem("jwt");
  const [response, setResponse] = useState();
  const [friendResponse, setFriendResponse] = useState();

  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //     key: "email",
  //   },
  //   {
  //     title: "User Id",
  //     dataIndex: "userId",
  //     key: "userId",
  //   },
  // ];

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

  const onSearch = (value) => {
    axios({
      method: "get",
      url: `http://localhost:8080/addfriends/${value}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
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
      console.log(friendRequest.data.message);
    } catch (error) {
      console.log(error);
    }
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
                    <Button
                      type="primary"
                      icon={<UserAddOutlined />}
                      onClick={() => {
                        handleFriendRequest(object._id);
                      }}
                    >
                      Add Friend
                    </Button>
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
          </tr>
          {friendResponse?.map((object, i) => {
            return (
              <>
                <tr key={i}>
                  <th>{object.name}</th>
                  <th>{object.email}</th>
                  <th>{object._id}</th>
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
