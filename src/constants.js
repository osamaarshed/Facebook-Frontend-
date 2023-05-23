import FriendRequests from "./Pages/Friends/FriendRequests";
import Friends from "./Pages/Friends/Friends";
import AllPosts from "./Pages/Posts/AllPosts";
import CreatePosts from "./Pages/Posts/CreatePosts";
import MyPosts from "./Pages/Posts/MyPosts";

export const navItems = [
  //   {
  //     name: "Posts",
  //     key: "sub1",
  //     linkTo: "/allposts",
  //     children: [
  //       {
  //         name: "All Posts",
  //         linkTo: "/allposts",
  //         key: "1",
  //       },
  //       {
  //         name: "My Posts",
  //         linkTo: "/myposts",
  //         key: "2",
  //       },
  //     ],
  //   },
  {
    name: "Create Posts",
    key: "createposts",
  },
  {
    name: "Friends",
    key: "friends",
  },
  {
    name: "Friend Requests",
    key: "friendRequest",
  },
  {
    name: "Logout",
    key: "logout",
    onclick: function () {
      localStorage.clear();
    },
  },
];

export const contentRoutes = {
  allposts: <AllPosts />,
  myposts: <MyPosts />,
  createposts: <CreatePosts />,
  friends: <Friends />,
  friendRequests: <FriendRequests />,
};
