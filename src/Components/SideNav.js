// import React from "react";
// import { useState } from "react";
// import { Button, Menu, Layout } from "antd";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
// } from "@ant-design/icons";
// import { sideNavItems } from "../constants";
// import { useSpring, animated } from "@react-spring/web";
// const { Sider } = Layout;

// const SideNav = ({ setActiveKey }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [clicked, setClicked] = useState(false);
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//     // setCollapse(!collapse);
//   };
//   const [springs, api] = useSpring(() => ({
//     from: {
//       x: clicked ? 0 : 100,
//       y: clicked ? 100 : 0,
//       display: clicked ? "none" : "block",
//     },
//   }));
//   const handleClick = () => {
//     api.start({
//       to: {
//         x: clicked ? 100 : 0,
//         y: clicked ? 0 : 100,
//         display: clicked ? "block" : "none",
//       },
//       // config: {
//       //   duration: 3000,
//       // },
//     });
//     setClicked(!clicked);
//   };

//   return (
//     <div>
//       {/* <Sider trigger={null}  width="100%"> */}
//       <div>
//         <Button
//           type="primary"
//           onClick={() => {
//             toggleCollapsed();
//             handleClick();
//           }}
//           style={{
//             marginBottom: 16,
//           }}
//         >
//           {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//         </Button>
//         <animated.div
//           style={{
//             ...springs,
//           }}
//         >
//           <Menu
//             onClick={({ key }) => {
//               setActiveKey(key);
//             }}
//             theme="dark"
//             style={{ height: "100%" }}
//             mode="inline"
//             defaultSelectedKeys={["1"]}
//             items={sideNavItems}
//           />
//         </animated.div>
//       </div>
//       {/* </Sider> */}
//     </div>
//   );
// };

// export default SideNav;
