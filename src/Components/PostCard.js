import React, { useEffect, useState } from "react";
import { Avatar, message, List, Card, Input, Form, Popconfirm } from "antd";
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
import { handleCommentSubmit, handleCommentDelete, handleDelete } from "../Api";
import { animated, useSpring } from "@react-spring/web";
import { likePostUpdate } from "../ReduxToolkit/store/PostSlices/AllPostsSlice";
import { likeMyPostUpdate } from "../ReduxToolkit/store/PostSlices/MyPostsSlice";
import { useNavigate } from "react-router-dom";
import { selectedPost } from "../ReduxToolkit/store/PostSlices/SelectedPostSlice";

const { Meta } = Card;
const { TextArea } = Input;

const PostCard = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
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
      <Card
        className="postCard-card"
        cover={
          <img
            alt="example"
            src={`${process.env.REACT_APP_API}public/images/${props.inputFile}`}
            className="postCard-img"
          />
        }
        actions={
          props.component === "myposts"
            ? [
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
                    getCommentsData();
                    setShowComments(!showComments);
                  }}
                />,
                <ShareAltOutlined key="share" />,
                <Popconfirm
                  title="Delete?"
                  description="Are you sure you want to Delete this post?"
                  icon={
                    <DeleteOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                  onConfirm={() => {
                    handleDelete(props.postId);
                    dispatch(renderPost());
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,

                <Popconfirm
                  title="Edit?"
                  description="Are you sure you want to edit this post?"
                  icon={
                    <EditOutlined
                      style={{
                        color: "blue",
                      }}
                    />
                  }
                  onConfirm={() => {
                    const payload = {
                      inputFile: props.inputFile,
                      postId: props.postId,
                    };
                    dispatch(selectedPost(payload));
                    navigate("/editposts");
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <EditOutlined key="edit" />
                </Popconfirm>,
              ]
            : [
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
              ]
        }
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
