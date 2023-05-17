import React from "react";
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";

const { Header } = Layout;
const { SubMenu } = Menu;

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/signin");
  };
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          style={{
            width: "100%",
          }}
          mode="horizontal"
        >
          {/* <Menu.Item key="friends" style={{ marginLeft: "auto" }}>
            <Link to="/friends">Friends</Link>
          </Menu.Item> */}
          <div className="Navbar-SubMenu">
            <Link to="/allposts">
              <SubMenu key="postsSubMenu" title="Posts">
                <Menu.Item
                  key="posts"
                  // style={{
                  //   marginLeft: "auto",
                  // }}
                >
                  <Link to="/myposts">My Posts</Link>
                </Menu.Item>
              </SubMenu>
            </Link>

            <Link to="/friends">
              <SubMenu key="friendsSubMenu" title="Friends">
                {/* <Menu.Item key="addFriend">Add Friend</Menu.Item> */}
                <Menu.Item key="friendRequests">
                  {" "}
                  <Link to="/friends/requests">Friend Request</Link>
                </Menu.Item>

                {/* <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup> */}
              </SubMenu>
            </Link>
          </div>

          <Menu.Item key="createPost">
            <Link to="/createposts">Create Post</Link>
          </Menu.Item>

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
  );
};

export default Navbar;
