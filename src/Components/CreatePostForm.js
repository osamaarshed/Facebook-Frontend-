import React, { useState } from "react";
import { Button, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

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
const CreatePostForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("inputFile:", values.inputFile[0].originFileObj);
    const data = new FormData();
    data.append("inputFile", values.inputFile[0].originFileObj);
    data.append("postDescription", values.postDescription);
    const token = localStorage.getItem("jwt");
    await axios({
      method: "post",
      url: "http://localhost:8080/posts/",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.message === "Created Successfully") {
          message.success("Created Successfully");
          form.resetFields();
        } else {
          message.error("Something Broke");
        }
        console.log(res.data);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%,-50%)",
        }}
      >
        <Form.Item
          name="inputFile"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="inputFile" action="/upload" listType="picture">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {/* <input type="file" /> */}
        </Form.Item>
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
  );
};

export default CreatePostForm;
