import React, { useState } from "react";
import { Layout, Menu, Space } from "antd";
import Navbar from "../Components/Navbar";
import { contentRoutes } from "../constants";
import { useSpring, animated } from "@react-spring/web";
import { sideNavItems } from "../constants";
import FooterSection from "../Components/FooterSection";
const { Header, Content, Sider, Footer } = Layout;

const Timeline = () => {
  const [activekey, setActiveKey] = useState("allposts");
  const [collapsed, setCollapsed] = useState(false);

  const navAnimation = useSpring({
    from: {
      marginTop: "10%",
      opacity: collapsed ? 0 : 1,
      visibility: collapsed ? "visible" : "hidden",
      transform: !collapsed ? `translateX(0%)` : `translateX(-100%)`,
    },
    to: async (next, cancel) => {
      await next({
        visibility: "visible",
        transform: collapsed ? `translateX(0%)` : `translateX(-100%)`,
        opacity: collapsed ? 1 : 0,
      });
      await next({ visibility: collapsed ? "visible" : "hidden" });
    },
    config: {
      mass: 4,
    },
  });

  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Layout className="timeline-layout">
          <animated.div
            style={navAnimation}
            className="navbar-menu-animateddiv"
          >
            <Sider
              className="timeline-sider"
              collapsible
              collapsed={!collapsed}
              collapsedWidth={0}
              reverseArrow={false}
              trigger={null}
              theme="dark"
            >
              <Menu
                className="navbar-menu"
                onClick={({ key }) => {
                  setActiveKey(key);
                }}
                defaultSelectedKeys={["1"]}
                items={sideNavItems}
              />
            </Sider>
          </animated.div>
          <Layout>
            <Header>
              <Navbar
                setActiveKey={(e) => setActiveKey(e)}
                setCollapsed={(e) => setCollapsed(e)}
                activekey={activekey}
                collapsed={collapsed}
              />
            </Header>
            <Content className="Content-container">
              {contentRoutes[activekey]}
            </Content>
            <Footer className="Footer-container">
              <FooterSection />
            </Footer>
          </Layout>
        </Layout>
      </Space>
    </>
  );
};

export default Timeline;
