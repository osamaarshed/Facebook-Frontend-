import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";
import SignIn from "./../Pages/SignIn/SignIn";
import { navItems } from "../constants";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { SubMenu } = Menu;

const navStyle = {
  display: "flex",
  alignItems: "center",
};

const Navbar = ({ setActiveKey }) => {
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (!jwt) {
      navigate("/signin");
    }
    // console.log("test");
  }, [jwt]);

  return (
    <>
      {/* {jwt ? ( */}
      <Header style={navStyle}>
        <Link to="/timeline">
          <h1 className="Navbar-header-h1">Facebook</h1>
        </Link>
        <div className="demo-logo" />
        <Menu
          onClick={({ key }) => {
            setActiveKey(key);
          }}
          theme="dark"
          style={{
            width: "100%",
          }}
          mode="horizontal"
        >
          <div className="Navbar-SubMenu">
            <SubMenu key="sub1" title="Posts">
              <Menu.Item key="allposts">All Posts</Menu.Item>
              <Menu.Item key="myposts">My Posts</Menu.Item>
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
      {/* ) : ( */}
      {/* <>{navigate("/signin")}</> */}
      {/* )} */}
    </>
  );
};

export default Navbar;
