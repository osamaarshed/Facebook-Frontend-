import React from "react";
import { Form, Input, Button, Upload } from "antd";
import Buttons from "../../Components/Buttons";
import { handleUpdate } from "../../Api";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditPosts = () => {
  const navigate = useNavigate();
  const postId = useSelector((state) => {
    return state.selectedPost.value;
  });
  const [form] = Form.useForm();
  const handleUpdateValues = async (value) => {
    const data = new FormData();
    if (value.inputFile) {
      data.append("inputFile", value.inputFile[0].originFileObj);
      data.append("postDescription", value.postDescription);
      data.append("postId", postId);
    } else {
      data.append("postDescription", value.postDescription);
      data.append("postId", postId);
    }
    const res = await handleUpdate(data);
    if (res === "Updated Successfully") {
      form.resetFields();
      navigate("/myposts");
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  return (
    <div className="editPosts-container">
      <Form
        name="control-hooks"
        onFinish={handleUpdateValues}
        form={form}
        className="editPosts-form"
      >
        <Form.Item
          label="Post Description"
          name="postDescription"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Post Description" />
        </Form.Item>
        <Form.Item
          name="inputFile"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="inputFile" action="/upload" listType="picture">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Buttons type="primary" htmlType="submit" title="Submit" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPosts;
