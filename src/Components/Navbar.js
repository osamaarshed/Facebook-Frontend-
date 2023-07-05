import React, { useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";
import { navItems } from "../constants";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, UnorderedListOutlined } from "@ant-design/icons";

const { Header } = Layout;

const navStyle = {
  display: "flex",
  alignItems: "center",
};

const Navbar = ({ setActiveKey, setCollapsed, collapsed }) => {
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
            <LeftOutlined
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

        <Link to="/allposts">
          <h1
            className={
              collapsed ? "Navbar-header-h1-collapsed" : "Navbar-header-h1"
            }
          >
            Facebook
          </h1>
        </Link>
        <div className="demo-logo" />
        <Menu
          className="Menu-Items"
          theme="dark"
          style={{
            width: "100%",
          }}
          mode="horizontal"
          items={navItems}
          onSelect={({ key }) => {
            setActiveKey(key);
          }}
        />
      </Header>
    </>
  );
};

export default Navbar;
