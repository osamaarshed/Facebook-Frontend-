import React from "react";
import { Button, Form, Input, message } from "antd";
import "../../Css/CreatePosts.css";
import axios from "axios";
import Navbar from "../../Components/Navbar";

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreatePosts = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const payload = {
      postDescription: values.postDescription,
    };
    const token = localStorage.getItem("jwt");
    await axios({
      method: "post",
      url: "http://localhost:8080/posts/",
      data: payload,
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.data.message === "Created Successfully") {
        message.success("Created Successfully");
        // alert("Created Successfully");
        form.resetFields();
      } else {
        message.error("Something Broke");
        // alert("Something Broke");
      }
      console.log(res.data);
    });
    console.log(values);
  };

  return (
    <div>
      <Navbar />
      <h1>Create Posts</h1>
      <div className="createPostsForm">
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="postDescription"
            label="Post Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePosts;
