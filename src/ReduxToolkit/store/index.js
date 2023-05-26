import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./PostSlices/AllPostsSlice";
import { myPostsSlice } from "./PostSlices/MyPostsSlice";
import { renderSlice } from "./PostSlices/RenderPostsSlice";
// import { likeClickedSlice } from "./PostSlices/LikeClickedSlice";
import { commentsSlice } from "./commentSlices/CommentsSlice";
import { commentsRenderSlice } from "./commentSlices/CommentsRenderSlice";
import { showFriendsSlice } from "./friendsSlices/ShowFriendsSlice";
import { friendRequestsSlice } from "./friendsSlices/FriendRequestsSlice";
import { likeCountSlice } from "./PostSlices/LikeSlice";

const store = configureStore({
  reducer: {
    post: postSlice.reducer,
    myposts: myPostsSlice.reducer,
    render: renderSlice.reducer,
    // like: likeClickedSlice.reducer,
    likeCount: likeCountSlice.reducer,
    comment: commentsSlice.reducer,
    commentRender: commentsRenderSlice.reducer,
    friends: showFriendsSlice.reducer,
    friendRequests: friendRequestsSlice.reducer,
  },
});

export default store;
