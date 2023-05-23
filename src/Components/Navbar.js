import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";
import SignIn from "./../Pages/SignIn/SignIn";
import { navItems } from "../constants";

const { Header } = Layout;
const { SubMenu } = Menu;

const Navbar = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    console.log("Render");
  }, []);

  const handleSubMenuHover = (key) => {
    setOpenKeys([key]);
  };
  return (
    <>
      {jwt ? (
        <Layout className="layout">
          <Header
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/allposts">
              <h1 className="Navbar-header-h1">Facebook</h1>
            </Link>
            <div className="demo-logo" />
            <Menu
              openKeys={openKeys}
              onOpenChange={setOpenKeys}
              theme="dark"
              style={{
                width: "100%",
              }}
              mode="horizontal"
            >
              <div className="Navbar-SubMenu">
                <SubMenu
                  key="sub1"
                  title="Posts"
                  onMouseHover={() => handleSubMenuHover("sub1")}
                >
                  <Menu.Item key="1">
                    <Link to="/allposts">All Posts</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/myposts">My Posts</Link>
                  </Menu.Item>
                </SubMenu>
              </div>
              {navItems?.map((object) => {
                return (
                  <Menu.Item key={object.key} onClick={object.onclick}>
                    <Link to={object.linkTo}>{object.name}</Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Header>
        </Layout>
      ) : (
        <>
          <SignIn />
        </>
      )}
    </>
  );
};

export default Navbar;
