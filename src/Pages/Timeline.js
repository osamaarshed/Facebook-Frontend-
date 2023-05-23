import React, { useState } from "react";
import { Layout } from "antd";
import Navbar from "../Components/Navbar";
import { contentRoutes } from "../constants";
const { Header, Content } = Layout;
const Timeline = () => {
  const [activekey, setActiveKey] = useState("");
  return (
    <>
      <Layout className="layout">
        <Header>
          <Navbar setActiveKey={(e) => setActiveKey(e)} />
        </Header>
        <Content>{contentRoutes[activekey]}</Content>
      </Layout>
    </>
  );
};

export default Timeline;
