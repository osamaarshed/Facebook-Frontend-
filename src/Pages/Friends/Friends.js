import React, { useEffect, useState } from "react";
import { Input, Pagination, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  UserAddOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Card, Button, Space, message, Select } from "antd";
import "../../Css/Friends.css";
import jwt_decode from "jwt-decode";
import { sendRequest, deleteFriend } from "../../Api";
import { fetchAllFriends } from "../../ReduxToolkit/store/friendsSlices/ShowFriendsSlice";
import { allUsers } from "../../ReduxToolkit/store/friendsSlices/FindAllUsersSlice";
const { Search } = Input;

const Friends = () => {
  const token = localStorage.getItem("jwt");
  const decodedToken = jwt_decode(token);
  const [value, setValue] = useState("");
  const [selectValue, setSelectValue] = useState("name");
  const [response, setResponse] = useState();
  const [sentRequest, setSentRequest] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useDispatch();
  const options = [
    {
      value: "name",
      label: "Search By Name",
    },
    {
      value: "email",
      label: "Search By Email",
    },
    {
      value: "id",
      label: "Search By Id",
    },
  ];

  const friends = useSelector((state) => {
    return state.friends.value;
  });

  const users = useSelector((state) => {
    return state.findAllUsers.value;
  });

  useEffect(() => {
    showFriends();
  }, [isDeleted]);

  const showFriends = () => {
    try {
      dispatch(fetchAllFriends());
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  const handleChange = (page) => {
    dispatch(fetchAllFriends(page - 1));
  };

  const handleSearchChange = (event) => {
    setValue(event.target.value);
  };

  const handleSelectChange = (value) => {
    setSelectValue(value);
  };

  const onSearch = (value) => {
    if (value?.friendRequests.includes(decodedToken._id)) {
      setSentRequest(true);
    } else if (value?.friends.includes(decodedToken._id)) {
      setIsFriend(true);
    } else {
      setSentRequest(false);
      setIsFriend(false);
    }
    setResponse(value);
    setValue(value.name);
  };

  const handleSendRequest = async (friendId) => {
    const payload = {
      friendId: friendId,
    };
    try {
      const res = await sendRequest(payload);
      message.success("Request Sent");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleDeleteFriend = async (friendId) => {
    try {
      const res = await deleteFriend(friendId);
      message.success(res.data.message);
      setIsDeleted(true);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    dispatch(allUsers());
  }, []);
  return (
    <div>
      <h1 className="text-lg font-bold mb-8">Friends</h1>
      <div className="Friends-search-container">
        <Input
          style={{ width: "80%" }}
          placeholder={
            selectValue === "email"
              ? "johndoe@gmail.com"
              : selectValue === "id"
              ? "Enter Id..."
              : "Enter Name..."
          }
          addonAfter={
            <Select
              defaultValue="name"
              onChange={handleSelectChange}
              options={options}
            />
          }
          value={value}
          onChange={(e) => handleSearchChange(e)}
          allowClear
        />
        <div className="friends-search-dropdown">
          {users
            ?.filter((item) => {
              const searchedValue =
                selectValue === "id" ? value : value.toLowerCase();
              const data =
                selectValue === "email"
                  ? item.email.toLowerCase()
                  : selectValue === "id"
                  ? item._id
                  : item.name.toLowerCase();
              return (
                searchedValue &&
                data.startsWith(searchedValue) &&
                data !== searchedValue
              );
            })
            .map((obj, i) => {
              return (
                <div
                  className="friends-search-items"
                  onClick={() => onSearch(obj)}
                  key={i}
                >
                  {selectValue === "email"
                    ? obj.email
                    : selectValue === "id"
                    ? obj._id
                    : obj.name}
                </div>
              );
            })}
        </div>
      </div>
      <div>
        {response ? (
          <div className="friends-card">
            <Card
              title={
                <div className="friends-card-title">
                  <div>{response.name} </div>
                  <div
                    className="friends-card-close"
                    onClick={() => {
                      setResponse(null);
                    }}
                  >
                    x
                  </div>
                </div>
              }
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
                      handleSendRequest(response._id);
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
        ) : (
          ""
        )}
      </div>
      <h1 className="text-lg font-bold my-8">All Friends</h1>
      <div className="friends-list-container">
        <table>
          <thead>
            <tr className="friends-tr">
              <th className="friends-th-name">Name</th>
              <th>Email</th>
              <th>Id</th>
              <th>Remove</th>
            </tr>
          </thead>
          {friends?.message?.map((object, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <th>{object.name}</th>
                  <th>{object.email}</th>
                  <th>{object._id}</th>
                  <th>
                    <Popconfirm
                      title="Remove?"
                      description="Are you sure you want to remove this friend?"
                      icon={<DeleteOutlined style={{ color: "red" }} />}
                      onConfirm={() => {
                        handleDeleteFriend(object._id);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger>
                        <DeleteOutlined />
                      </Button>
                    </Popconfirm>
                  </th>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className="Friends-pagination">
        <Pagination
          defaultCurrent={1}
          pageSize={5}
          total={friends?.count}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

export default Friends;
