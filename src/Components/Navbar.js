import React from "react";
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";
import SigninForm from "../Components/SignInForm";

const { Header } = Layout;
const { SubMenu } = Menu;

const Navbar = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/signin");
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
              theme="dark"
              style={{
                width: "100%",
              }}
              mode="horizontal"
            >
              <div className="Navbar-SubMenu">
                <SubMenu key="postsSubMenu" title="Posts">
                  <Menu.Item key="Alltheposts">
                    <Link to="/allposts">All Posts</Link>
                  </Menu.Item>
                  <Menu.Item key="posts">
                    <Link to="/myposts">My Posts</Link>
                  </Menu.Item>
                </SubMenu>
              </div>
              <div>
                <Menu.Item key="createPost">
                  <Link to="/createposts">Create Post</Link>
                </Menu.Item>
              </div>
              <div>
                <SubMenu key="friendsSubMenu" title="Friends">
                  <Menu.Item key="friends">
                    <Link to="/friends">Friends</Link>
                  </Menu.Item>
                  <Menu.Item key="friendRequests">
                    <Link to="/friends/requests">Friend Request</Link>
                  </Menu.Item>
                </SubMenu>
              </div>

              <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogOut}
              >
                Logout
              </Menu.Item>
            </Menu>
          </Header>

          {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
        </Layout>
      ) : (
        <>
          <SigninForm />
        </>
      )}
    </>
  );
};

export default Navbar;
