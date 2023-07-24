import { Link } from "react-router-dom";
import FriendRequests from "./Pages/Friends/FriendRequests";
import Friends from "./Pages/Friends/Friends";
import Messages from "./Pages/Messages/Messages";
import AllPosts from "./Pages/Posts/AllPosts";
import CreatePosts from "./Pages/Posts/CreatePosts";
import Parallax from "./Pages/Test/Parallax";
import Test from "./Pages/Test/Test";
import UseSprings from "./Pages/Test/UseSprings";
import UseTrail from "./Pages/Test/UseTrail";
import UseTransition from "./Pages/Test/UseTransition";

export const navItems = [
  {
    label: "Posts",
    key: "sub1",
    children: [
      {
        label: <Link to="allposts">All Posts</Link>,
        key: "allposts",
      },
      {
        label: "My Posts",
        key: "myposts",
      },
    ],
  },
  {
    label: <Link to="createposts">Create Posts</Link>,
    key: "createposts",
  },
  {
    label: <Link to="messages">Messages</Link>,
    key: "messages",
  },
  {
    label: <Link to="friends">Friends</Link>,
    key: "friends",
  },
  {
    label: <Link to="friendRequests">Friend Requests</Link>,
    key: "friendRequests",
  },
  {
    label: "Animations",
    key: "animations",
    children: [
      {
        label: "React Spring",
        key: "spring",
        children: [
          {
            label: <Link to="test">useScroll Hook</Link>,
            key: "test",
          },
          {
            label: <Link to="usetransition">useTransition Hook</Link>,
            key: "usetransition",
          },
          {
            label: <Link to="usesprings">useSprings Hook</Link>,
            key: "usesprings",
          },
          {
            label: <Link to="usetrail">useTrail Hook</Link>,
            key: "usetrail",
          },
          {
            label: <Link to="parallax">Parallax</Link>,
            key: "parallax",
          },
        ],
      },
      {
        label: "Tailwind",
        key: "tailwindCss",
        children: [
          {
            label: <Link to="tailwind">Tailwind Css</Link>,
            key: "tailwind",
          },
        ],
      },
    ],
  },
  {
    label: "Logout",
    key: "logout",
    onClick: function () {
      localStorage.clear();
    },
  },
];

export const sideNavItems = [
  {
    label: "Posts",
    key: "sub1",
    children: [
      {
        label: <Link to="allposts">All Posts</Link>,
        key: "allposts",
      },
      {
        label: "My Posts",
        key: "myposts",
      },
    ],
  },
  {
    label: <Link to="createposts">Create Posts</Link>,
    key: "createposts",
  },
  {
    label: <Link to="messages">Messages</Link>,
    key: "messages",
  },
  {
    label: <Link to="friends">Friends</Link>,
    key: "friends",
  },
  {
    label: <Link to="friendRequests">Friend Requests</Link>,
    key: "friendRequests",
  },
  {
    label: "Animations",
    key: "animations",
    children: [
      {
        label: "React Spring",
        key: "spring",
        children: [
          {
            label: <Link to="test">useScroll Hook</Link>,
            key: "test",
          },
          {
            label: <Link to="usetransition">useTransition Hook</Link>,
            key: "usetransition",
          },
          {
            label: <Link to="usesprings">useSprings Hook</Link>,
            key: "usesprings",
          },
          {
            label: <Link to="usetrail">useTrail Hook</Link>,
            key: "usetrail",
          },
          {
            label: <Link to="parallax">Parallax</Link>,
            key: "parallax",
          },
        ],
      },
      {
        label: "Tailwind",
        key: "tailwindCss",
        children: [
          {
            label: <Link to="tailwind">Tailwind Css</Link>,
            key: "tailwind",
          },
        ],
      },
    ],
  },
  {
    label: "Logout",
    key: "logout",
    onClick: function () {
      localStorage.clear();
    },
  },
];

export const contentRoutes = {
  allposts: <AllPosts />,
  createposts: <CreatePosts />,
  messages: <Messages />,
  friends: <Friends />,
  friendRequests: <FriendRequests />,
  test: <Test />,
  usetransition: <UseTransition />,
  usesprings: <UseSprings />,
  usetrail: <UseTrail />,
  parallax: <Parallax />,
};
