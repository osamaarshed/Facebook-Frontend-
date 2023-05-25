import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import MyPosts from "./Pages/Posts/MyPosts";
import CreatePosts from "./Pages/Posts/CreatePosts";
import Friends from "./Pages/Friends/Friends";
import FriendRequests from "./Pages/Friends/FriendRequests";
import AllPosts from "./Pages/Posts/AllPosts";
import Timeline from "./Pages/Timeline";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Timeline />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/allposts",
    element: <AllPosts />,
  },
  {
    path: "/myposts",
    element: <MyPosts />,
  },
  {
    path: "/createposts",
    element: <CreatePosts />,
  },
  {
    path: "/friends",
    element: <Friends />,
  },
  {
    path: "/friendRequests",
    element: <FriendRequests />,
  },
]);

export default router;
