import React from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../Css/SignInForm.css";

const SignIn = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    await axios
      .post(`${process.env.REACT_APP_API}signin/`, payload)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Login Successful") {
          localStorage.setItem("jwt", res.data.jwt);
          message.success("Login Successful");
          navigate("/allposts");
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="signInForm">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 12,
          }}
        >
          <Link to={"/"}>Register Now</Link>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
