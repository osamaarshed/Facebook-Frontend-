import FriendRequests from "./Pages/Friends/FriendRequests";
import Friends from "./Pages/Friends/Friends";
import Messages from "./Pages/Messages/Messages";
import AllPosts from "./Pages/Posts/AllPosts";
import CreatePosts from "./Pages/Posts/CreatePosts";
import MyPosts from "./Pages/Posts/MyPosts";
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
        label: "All Posts",
        key: "allposts",
      },
      {
        label: "My Posts",
        key: "myposts",
      },
    ],
  },
  {
    label: "Create Posts",
    key: "createposts",
  },
  {
    label: "Messages",
    key: "messages",
  },
  {
    label: "Friends",
    key: "friends",
  },
  {
    label: "Friend Requests",
    key: "friendRequests",
  },

  {
    label: "Test",
    key: "test",
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
        label: "All Posts",
        key: "allposts",
      },
      {
        label: "My Posts",
        key: "myposts",
      },
    ],
  },
  {
    label: "Create Posts",
    key: "createposts",
  },
  {
    label: "Messages",
    key: "messages",
  },
  {
    label: "Friends",
    key: "friends",
  },
  {
    label: "Friend Requests",
    key: "friendRequests",
  },
  {
    label: "Animations",
    key: "sub2",
    children: [
      {
        label: "useScroll Hook",
        key: "test",
      },
      {
        label: "useTransition Hook",
        key: "usetransition",
      },
      {
        label: "useSprings Hook",
        key: "usesprings",
      },
      {
        label: "useTrail Hook",
        key: "usetrail",
      },
      {
        label: "Parallax",
        key: "parallax",
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
  myposts: <MyPosts />,
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
