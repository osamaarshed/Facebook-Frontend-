import React, { useEffect, useState } from "react";
import { Avatar, Card, Input, Space, Form } from "antd";
import { Modal, message, Col, Row } from "antd";
import Buttons from "./Buttons";
import { useDispatch, useSelector } from "react-redux";
import { renderPost } from "../ReduxToolkit/store/PostSlices/RenderPostsSlice";
import { handleLikeState } from "../ReduxToolkit/store/PostSlices/LikeClickedSlice";
import { fetchCommentsData } from "../ReduxToolkit/store/commentSlices/CommentsSlice";
// import { renderComments } from "../ReduxToolkit/store/commentSlices/CommentsRenderSlice";
import {
  CommentOutlined,
  ShareAltOutlined,
  LikeOutlined,
  LikeTwoTone,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  // showComments,
  handleCommentSubmit,
  handleCommentDelete,
  likePost,
  handleDelete,
  handleUpdate,
} from "../Api";

const { Meta } = Card;

const PostCard = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [commentData, setCommentData] = useState([]);
  const [commentRender, setCommentRender] = useState(false);
  // const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();

  const clicked = useSelector((state) => {
    return state.like;
  });

  const commentData = useSelector((state) => {
    // console.log(state.comment.value);
    return state.comment.value;
  });

  // const commentRender = useSelector((state) => {
  //   return state.commentRender.value;
  // });
  // console.log(clicked.value);

  const handleOk = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };
  const handleCommentSubmitFinish = async (values) => {
    await handleCommentSubmit(props.postId, values);
    setCommentRender(!commentRender);
    // dispatch(renderComments());
    form.resetFields();
  };
  const handleLike = async () => {
    dispatch(renderPost());
    // props?.setStateRender(!props?.render);

    if (clicked.value === false) {
      const payload = {
        postId: props.postId,
        like: "true",
      };
      try {
        const res = await likePost(payload);
        dispatch(handleLikeState());
        // setIsClicked(!isClicked);
        message.success("Liked");
        console.log(res.data);
      } catch (error) {
        message.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    } else {
      const payload = {
        postId: props.postId,
        like: "false",
      };
      try {
        const res = await likePost(payload);
        // setIsClicked(!isClicked);
        dispatch(handleLikeState());
        message.success("Disliked");
        console.log(res.data);
      } catch (error) {
        message.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };
  const handleUpdateValues = async (value) => {
    await handleUpdate(props.postId, value);
    form.resetFields();
    // props?.setStateRender(!props?.render);
    dispatch(renderPost());
  };
  const getCommentsData = () => {
    // const res = await showComments(props.postId);
    dispatch(fetchCommentsData(props.postId));
    // setCommentData(res);
  };

  useEffect(() => {
    getCommentsData();
  }, [commentRender]);

  return (
    <div>
      <Modal
        title="Comments"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* {console.log(commentData, "Commentdata")} */}
        {commentData?.map((object, i) => {
          return (
            <>
              <Row key={i}>
                <Col span={12}>
                  <b> {object.userId.name} :</b> " {object.comment} "
                </Col>
                <Col span={4} offset={6}>
                  <Buttons
                    title={<DeleteOutlined />}
                    onClick={async () => {
                      const res = await handleCommentDelete(object.postId);
                      if (res) {
                        setCommentRender(!commentRender);
                        // dispatch(renderComments());
                      }
                    }}
                  />
                </Col>
              </Row>
            </>
          );
        })}
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Form
            name="control-hooks"
            onFinish={handleCommentSubmitFinish}
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
              <Buttons type="primary" htmlType="submit" title="Submit" />
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
            onFinish={handleUpdateValues}
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
              <Buttons type="primary" htmlType="submit" title="Submit" />
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
            src={`${process.env.REACT_APP_API}public/images/${props.inputFile}`}
            style={{
              objectFit: "cover",
              width: 600,
              height: 400,
            }}
          />
        }
        actions={[
          <span>
            {clicked.value ? (
              <LikeTwoTone
                key="likes"
                id={props.postId}
                onClick={() => {
                  handleLike();
                }}
              />
            ) : (
              <LikeOutlined
                key="unlike"
                id={props.postId}
                onClick={() => {
                  handleLike();
                }}
              />
            )}

            {props.likeCount}
          </span>,
          <CommentOutlined
            key="comment"
            id={props.postId}
            onClick={() => {
              setIsModalOpen(true);
              getCommentsData();
            }}
          />,
          <ShareAltOutlined key="share" />,

          <DeleteOutlined
            key="delete"
            onClick={() => {
              handleDelete(props.postId);
              // props?.setStateRender(!props?.render);
              dispatch(renderPost());
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
