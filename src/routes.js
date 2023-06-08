import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import MyPosts from "./Pages/Posts/MyPosts";
import CreatePosts from "./Pages/Posts/CreatePosts";
import Friends from "./Pages/Friends/Friends";
import FriendRequests from "./Pages/Friends/FriendRequests";
import AllPosts from "./Pages/Posts/AllPosts";
import Timeline from "./Pages/Timeline";
import Messages from "./Pages/Messages/Messages";
import Test from "./Pages/Test/Test";
import UseTransition from "./Pages/Test/UseTransition";
import UseSprings from "./Pages/Test/UseSprings";
import UseTrail from "./Pages/Test/UseTrail";
import Parallax from "./Pages/Test/Parallax";

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
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/friends",
    element: <Friends />,
  },
  {
    path: "/friendRequests",
    element: <FriendRequests />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/usetransition",
    element: <UseTransition />,
  },
  {
    path: "/usesprings",
    element: <UseSprings />,
  },
  {
    path: "/usetrail",
    element: <UseTrail />,
  },
  {
    path: "/parallax",
    element: <Parallax />,
  },
]);

export default router;
