import FriendRequests from "./Pages/Friends/FriendRequests";
import Friends from "./Pages/Friends/Friends";
import Messages from "./Pages/Messages/Messages";
import AllPosts from "./Pages/Posts/AllPosts";
import CreatePosts from "./Pages/Posts/CreatePosts";
import MyPosts from "./Pages/Posts/MyPosts";
import Test from "./Pages/Test/Test";

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
    // icon: <span>{<LogoutOutlined />}</span>,
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
    label: "Test",
    key: "test",
  },
  {
    label: "Logout",
    // icon: <span>{<LogoutOutlined />}</span>,
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
};
