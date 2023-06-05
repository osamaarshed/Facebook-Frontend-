import React, { useEffect, useState } from "react";
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
        <Button
          type="dark"
          onClick={() => {
            toggleCollapsed();
          }}
        >
          {collapsed ? (
            <CloseOutlined
              style={{
                color: "white",
              }}
            />
          ) : (
            <UnorderedListOutlined
              style={{
                color: "white",
              }}
            />
          )}
        </Button>

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
