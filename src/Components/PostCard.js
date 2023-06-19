import React, { useEffect, useState } from "react";
import {
  Avatar,
  Modal,
  message,
  Col,
  Row,
  List,
  Card,
  Input,
  Space,
  Form,
} from "antd";
import Buttons from "./Buttons";
import { useDispatch, useSelector } from "react-redux";
import { renderPost } from "../ReduxToolkit/store/PostSlices/RenderPostsSlice";
import { fetchCommentsData } from "../ReduxToolkit/store/commentSlices/CommentsSlice";
import {
  CommentOutlined,
  ShareAltOutlined,
  LikeOutlined,
  LikeTwoTone,
  DeleteOutlined,
  EditOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  handleCommentSubmit,
  handleCommentDelete,
  handleDelete,
  handleUpdate,
} from "../Api";
import { animated, useSpring } from "@react-spring/web";
import { likePostUpdate } from "../ReduxToolkit/store/PostSlices/AllPostsSlice";
import { likeMyPostUpdate } from "../ReduxToolkit/store/PostSlices/MyPostsSlice";

const { Meta } = Card;
const { TextArea } = Input;

const PostCard = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [commentRender, setCommentRender] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const animation = useSpring({
    from: {
      y: -100,
    },
    to: {
      y: showComments ? 0 : -100,
    },
  });

  const dispatch = useDispatch();

  const commentData = useSelector((state) => {
    return state.comment.value;
  });

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
    form.resetFields();
  };
  const handleLike = async () => {
    if (isClicked === false) {
      const payload = {
        postId: props.postId,
        like: "true",
      };
      try {
        setIsClicked(!isClicked);
        props.component === "allposts"
          ? dispatch(likePostUpdate(payload))
          : dispatch(likeMyPostUpdate(payload));

        message.success("Liked");
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
        setIsClicked(!isClicked);
        props.component === "allposts"
          ? dispatch(likePostUpdate(payload))
          : dispatch(likeMyPostUpdate(payload));
        message.success("Disliked");
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
    <div className="postCard-container">
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
        className="postCard-card"
        cover={
          <img
            alt="example"
            src={`${process.env.REACT_APP_API}public/images/${props.inputFile}`}
            className="postCard-img"
          />
        }
        actions={[
          <span key="span">
            {isClicked ? (
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
              // setIsModalOpen(true);
              getCommentsData();
              setShowComments(!showComments);
            }}
          />,
          <ShareAltOutlined key="share" />,

          <DeleteOutlined
            key="delete"
            onClick={() => {
              handleDelete(props.postId);
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
      {showComments ? (
        <animated.div
          style={animation}
          className="postCard-showComments-container"
        >
          {/* <Space.Compact> */}
          <Form
            className="postCard-comment-modal-form"
            name="control-hooks"
            onFinish={handleCommentSubmitFinish}
            form={form}
          >
            <Form.Item
              className="postCard-formItem-textArea"
              name="comment"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea rows={4} placeholder="Add Comment..." />
            </Form.Item>
            <Form.Item className="postCard-formItem-sendButton">
              <Buttons
                type="primary"
                htmlType="submit"
                title={<SendOutlined />}
              />
            </Form.Item>
          </Form>
          {/* </Space.Compact> */}

          <List
            className="postCard-commentsListContainer"
            itemLayout="horizontal"
          >
            {commentData?.map((object, i) => {
              return (
                <List.Item key={i}>
                  <List.Item.Meta
                    className="postCard-commentsListItem"
                    title={object.userId.name}
                    description={object.comment}
                  />
                  <DeleteOutlined
                    className="postCard-comment-delete"
                    onClick={async () => {
                      const res = await handleCommentDelete(object.postId);
                      if (res) {
                        setCommentRender(!commentRender);
                      }
                    }}
                  />
                </List.Item>
              );
            })}
          </List>
        </animated.div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostCard;
