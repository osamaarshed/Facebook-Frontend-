import React from "react";
// import { useState } from "react";
import { Button, Form, Input } from "antd";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Css/SignUpForm.css";

// const [form, setForm] = useState({

// })

const SignUpForm = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmpassword: values.confirmpassword,
    };
    //   console.log(payload);
    // console.log("Success:", values);

    await axios
      .post("http://localhost:8080/signup/", payload)
      .then((res) => {
        console.log(res);
        if (res.data.message === "Created Successfully") {
          navigate("/signin");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="signUpForm">
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          label="Confirm Password"
          name="confirmpassword"
          rules={[
            {
              required: true,
              message: "Please input your password again!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 10,
          }}
        >
          <Link to={"/signin"}>Already a user?</Link>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
