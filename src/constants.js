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
    key: "createPosts",
    linkTo: "/createposts",
  },
  {
    name: "Friends",
    key: "friends",
    linkTo: "/friends",
  },
  {
    name: "Friend Requests",
    key: "friendRequest",
    linkTo: "/friends/requests",
  },
  {
    name: "Logout",
    key: "logout",
    linkTo: "/signin",
    onclick: function () {
      localStorage.clear();
    },
  },
];
