import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Css/SignInForm.css";

// const [form, setForm] = useState({

// })

const SignInForm = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    //   console.log(payload);
    // console.log("Success:", values);

    await axios
      .post("http://localhost:8080/signin/", payload)
      .then((res) => {
        // localStorage.setItem("jwt", res.data.jwt);
        console.log(res.data);
        if (res.data.message === "Login Successful") {
          localStorage.setItem("jwt", res.data.jwt);
          navigate("/allposts");
        }
      })
      .catch((err) => {
        console.log(err);
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
          // alignItems: "center",
          // textAlign: "center",
          // justifyContent: "center",
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

export default SignInForm;
