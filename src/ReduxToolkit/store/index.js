import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./PostSlices/AllPostsSlice";
import { myPostsSlice } from "./PostSlices/MyPostsSlice";
import { renderSlice } from "./PostSlices/RenderPostsSlice";
import { commentsSlice } from "./commentSlices/CommentsSlice";
import { commentsRenderSlice } from "./commentSlices/CommentsRenderSlice";
import { showFriendsSlice } from "./friendsSlices/ShowFriendsSlice";
import { friendRequestsSlice } from "./friendsSlices/FriendRequestsSlice";
import { likeCountSlice } from "./PostSlices/LikeSlice";
import { showMessageSlice } from "./messagesSlices/showMessageSlice";
import { AllMessages } from "./messagesSlices/AllMessagesSlice";
import { setPageSlice } from "./messagesSlices/SetPageSlice";
import { showSpecificChatsSlice } from "./messagesSlices/showSpecifcChatsSlice";
import { selectedIdSlice } from "./messagesSlices/selectedIdSlice";
import { selectedPostSlice } from "./PostSlices/SelectedPostSlice";
import { findAllUsersSlice } from "./friendsSlices/FindAllUsersSlice";

const store = configureStore({
  reducer: {
    post: postSlice.reducer,
    myposts: myPostsSlice.reducer,
    render: renderSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
    likeCount: likeCountSlice.reducer,
    comment: commentsSlice.reducer,
    commentRender: commentsRenderSlice.reducer,
    friends: showFriendsSlice.reducer,
    findAllUsers: findAllUsersSlice.reducer,
    friendRequests: friendRequestsSlice.reducer,
    messages: showMessageSlice.reducer,
    specificMessages: showSpecificChatsSlice.reducer,
    allmessages: AllMessages.reducer,
    setpages: setPageSlice.reducer,
    selectedId: selectedIdSlice.reducer,
  },
});

export default store;
