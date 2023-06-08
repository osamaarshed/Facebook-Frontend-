import React, { useEffect, useState } from "react";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Card, Button, Space } from "antd";
import { handleRequest } from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import { showFriendRequests } from "../../ReduxToolkit/store/friendsSlices/FriendRequestsSlice";

const FriendRequests = () => {
  const [requestStatus, setRequestStatus] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    displayFriendRequests();
  }, [requestStatus]);

  const displayFriendRequests = async () => {
    dispatch(showFriendRequests());
  };

  const friendRequests = useSelector((state) => {
    return state.friendRequests.value;
  });
  return (
    <div>
      <h1>FriendRequests</h1>
      {!friendRequests?.length ? (
        <>
          <p className="friendRequest-paragraph">No Friend Requests to show</p>
        </>
      ) : (
        <div className="friendRequest-div">
          {friendRequests?.map((object) => {
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
      )}
    </div>
  );
};

export default FriendRequests;
