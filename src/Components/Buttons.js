import React from "react";
import { Button } from "antd";

const Buttons = (props) => {
  return (
    <>
      <Button
        type={props.type}
        htmlType={props.htmlType}
        onClick={props.onClick}
      >
        {props.title}
      </Button>
    </>
  );
};

export default Buttons;
