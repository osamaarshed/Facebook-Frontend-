import React, { useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";
import { navItems } from "../constants";
import { useNavigate } from "react-router-dom";
import { CloseOutlined, UnorderedListOutlined } from "@ant-design/icons";

const { Header } = Layout;

const navStyle = {
  display: "flex",
  alignItems: "center",
};

const Navbar = ({ setActiveKey, setCollapsed, collapsed, activekey }) => {
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (!jwt) {
      navigate("/signin");
    }
  }, [jwt]);

  return (
    <>
      <Header style={navStyle}>
        {collapsed ? (
          <Button
            style={{
              marginLeft: "-21%",
            }}
            type="dark"
            onClick={() => {
              toggleCollapsed();
            }}
          >
            <CloseOutlined
              style={{
                color: "white",
              }}
            />
          </Button>
        ) : (
          <Button
            type="dark"
            onClick={() => {
              toggleCollapsed();
            }}
          >
            <UnorderedListOutlined
              style={{
                color: "white",
              }}
            />
          </Button>
        )}

        <Link to="/">
          <h1 className="Navbar-header-h1">Facebook</h1>
        </Link>
        <div className="demo-logo" />

        <Menu
          className="Menu-Items"
          onClick={({ key }) => {
            setActiveKey(key);
          }}
          theme="dark"
          style={{
            width: "100%",
          }}
          mode="horizontal"
          items={navItems}
        ></Menu>
      </Header>
    </>
  );
};

export default Navbar;
