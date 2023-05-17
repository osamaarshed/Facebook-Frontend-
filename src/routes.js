import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import SignInForm from "./Components/SignInForm";
import MyPosts from "./Pages/Posts/MyPosts";
import CreatePosts from "./Pages/Posts/CreatePosts";
import Friends from "./Pages/Friends/Friends";
import FriendRequests from "./Pages/Friends/FriendRequests";
import AllPosts from "./Pages/Posts/AllPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignInForm />,
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
    path: "/friends/requests",
    element: <FriendRequests />,
  },
]);

export default router;
