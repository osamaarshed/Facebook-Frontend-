import React, { useState } from "react";
import { Modal } from "antd";
import {
  CommentOutlined,
  ShareAltOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Avatar, Card, Input, Button, Space, Form } from "antd";
const { Meta } = Card;

const PostCard = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentData, setCommentData] = useState([]);

  const token = localStorage.getItem("jwt");

  const showComments = async () => {
    setIsModalOpen(true);
    const params = props.postId;
    console.log(params, "event.currentTarget.id");

    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:8080/comments/${props.postId}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setCommentData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async (values) => {
    const payload = {
      comment: values.comment,
      postId: props.postId,
    };
    await axios({
      method: "post",
      url: "http://localhost:8080/comments/",
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLike = () => {
    const payload = {
      postId: props.postId,
      like: "true",
    };

    axios({
      method: "post",
      url: "http://localhost:8080/posts/like",
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    }).then((res) => {
      console.log(res.data);
    });
  };

  const handleDislike = async () => {
    const payload = {
      postId: props.postId,
      like: "false",
    };
    await axios({
      method: "post",
      url: "http://localhost:8080/posts/like",
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        title="Comments"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {commentData?.map((object) => {
          return (
            <>
              <span>
                {object.userId.name} : {object.comment} <br />
              </span>
            </>
          );
        })}
        {/* {response && <div>Response: {response}</div>} */}
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Form
            name="control-hooks"
            onFinish={handleCommentSubmit}
            form={form}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="comment"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Add Comment" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space.Compact>
      </Modal>
      <Card
        style={{
          width: 600,
          marginTop: "50px",
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <span key="like">
            <LikeOutlined id={props.postId} onClick={handleLike} />
            {props.likeCount}
          </span>,
          <span key="dislike">
            <DislikeOutlined id={props.postId} onClick={handleDislike} />
          </span>,
          <CommentOutlined
            key="comment"
            id={props.postId}
            onClick={showComments}
          />,
          <ShareAltOutlined key="share" />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title={props.cardTitle}
          description={props.cardDescription}
        />
      </Card>
    </div>
  );
};

export default PostCard;
