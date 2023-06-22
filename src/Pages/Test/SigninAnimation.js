import { Button, Checkbox, Form, Input } from "antd";
import { useTransition, animated } from "@react-spring/web";
import { Alert } from "antd";
import { useState } from "react";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SigninAnimation = () => {
  const [index, setIndex] = useState(0);
  const data = [
    <>
      <Alert message="Error1" type="error" showIcon />
    </>,
    <>
      <Alert message="Error2" type="error" showIcon />
    </>,
    <>
      <Alert message="Error3" type="error" showIcon />
    </>,
  ];

  const transition = useTransition(index, {
    from: {
      opacity: 0,
      //  display: "none",
      height: 0,
    },
    enter: {
      to: async (next, cancel) => {
        // await next({ display: "block" });
        await next({ height: 50 });
        await next({ opacity: 1 });
      },
    },
    leave: {
      to: async (next, cancel) => {
        await next({ height: 0 });
        await next({ opacity: 0 });
        // await next({ display: "none" });
      },
    },
    exitBeforeEnter: true,
  });
  const handleClick = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };
  return (
    <div>
      <div>
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
          <div className="signinAnimation-animation">
            {transition((style, item) => {
              return (
                <>
                  <h1 style={style}>Hello</h1>
                  <animated.div style={style}>{data[item]}</animated.div>
                </>
              );
            })}
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={handleClick}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SigninAnimation;
