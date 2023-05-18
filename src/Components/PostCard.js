import React, { useEffect, useState } from "react";
import { Modal, message, Col, Row } from "antd";
import {
  CommentOutlined,
  ShareAltOutlined,
  LikeOutlined,
  LikeTwoTone,
  DeleteOutlined,
  EditOutlined,
  // DislikeOutlined,
  // DislikeTwoTone,
} from "@ant-design/icons";
import axios from "axios";
import { Avatar, Card, Input, Button, Space, Form } from "antd";
const { Meta } = Card;

const PostCard = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [commentRender, setCommentRender] = useState(false);
  // const [isTrue, setIsTrue] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  // const [commentRender, setCommentRender] = useState(false);

  const token = localStorage.getItem("jwt");

  const handleOk = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const showComments = async () => {
    // setIsModalOpen(true);
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:8080/comments/${props.postId}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      // props?.setStateRender(!props?.render);
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
        form.resetFields();
        setCommentRender(!commentRender);
        // setCommentRender(!commentRender);
        message.success("Comment Posted");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCommentDelete = async (postId) => {
    // console.log(postId._id);
    await axios({
      method: "delete",
      url: `http://localhost:8080/comments/${postId._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setCommentRender(!commentRender);
        message.success(res.data.message);
        console.log(res.data.message);
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  const handleLike = async () => {
    if (isClicked === false) {
      const payload = {
        postId: props.postId,
        like: "true",
      };
      await axios({
        method: "post",
        url: "http://localhost:8080/posts/like",
        headers: { Authorization: `Bearer ${token}` },
        data: payload,
      })
        .then((res) => {
          setIsClicked(!isClicked);
          message.success("Liked");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
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
          setIsClicked(!isClicked);
          message.success("Disliked");
          console.log(res.data);
        })
        .catch((err) => {
          // alert(err.response.data.message);
          console.log(err.response.data.message);
        });
    }
  };

  const handleDelete = async () => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/posts/${props.postId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        message.success(res.data.message);
        props?.setStateRender(!props?.render);
        // alert(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        // alert(err.response.data.message);
      });
  };

  const handleUpdate = async (value) => {
    const payload = {
      postId: props.postId,
      postDescription: value.postDescription,
    };
    await axios({
      method: "put",
      url: "http://localhost:8080/posts/",
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    })
      .then((res) => {
        form.resetFields();
        message.success("Updated");
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    showComments();
  }, [commentRender]);

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
              <Row>
                <Col span={12}>
                  <b> {object.userId.name} :</b> " {object.comment} "
                </Col>
                <Col span={4} offset={6}>
                  <Button
                    onClick={() => {
                      handleCommentDelete(object.postId);
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </Col>
              </Row>
              {/* <span>
                <b> {object.userId.name} :</b> " {object.comment} " <br />
              </span> */}
            </>
          );
        })}
        <Space.Compact
          style={{
            width: "100%",
            // marginLeft: "10%",
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

      <Modal
        title="Edit Post"
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Form
            name="control-hooks"
            onFinish={handleUpdate}
            form={form}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="postDescription"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Post Description" />
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
            {isClicked ? (
              <LikeTwoTone id={props.postId} onClick={handleLike} />
            ) : (
              <LikeOutlined id={props.postId} onClick={handleLike} />
            )}

            {/* <LikeOutlined id={props.postId} onClick={handleLike} /> */}
            {props.likeCount}
          </span>,
          // <span key="dislike">
          //   <DislikeOutlined id={props.postId} onClick={handleLike} />
          // </span>,
          <CommentOutlined
            key="comment"
            id={props.postId}
            onClick={() => {
              setIsModalOpen(true);
              showComments();
            }}
          />,
          <ShareAltOutlined key="share" />,
          <DeleteOutlined
            key="delete"
            onClick={() => {
              handleDelete();
            }}
          />,
          <EditOutlined
            key="edit"
            onClick={() => {
              setIsEditModalOpen(true);
            }}
          />,
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
