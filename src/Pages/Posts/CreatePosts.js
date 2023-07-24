import React from "react";
import { Form, Input, Upload } from "antd";
import "./../../Css/CreatePosts.css";
import { Button } from "flowbite-react";
import { BsUpload } from "react-icons/bs";
import { postCreate } from "../../Api";

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
    console.log("Values: ", values);
    console.log("inputFile:", values.inputFile[0].originFileObj);
    const data = new FormData();
    data.append("inputFile", values.inputFile[0].originFileObj);
    data.append("postDescription", values.postDescription);

    const res = await postCreate(data);
    if (res === "Created Successfully") {
      form.resetFields();
    }
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f0f0",
        }}
      >
        <h1 className="text-lg font-bold">Create Posts</h1>
        <div className="flex justify-center mt-12 px-12 py-12">
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
              name="inputFile"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="inputFile"
                action="/upload"
                listType="picture"
                maxCount={1}
              >
                <Button pill>
                  <BsUpload />
                </Button>
              </Upload>
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
              <Button pill type="submit">
                Submit
              </Button>
              {/* <Buttons type="primary" htmlType="submit" title="Submit" /> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreatePosts;
