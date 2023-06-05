import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPosts, likePost } from "../../../Api";

export const fetchMyPostsData = createAsyncThunk(
  "posts/fetchMyPostsData",
  async () => {
    const res = await getPosts();
    return res;
  }
);

export const likeMyPostUpdate = createAsyncThunk(
  "posts/likeMyPostUpdate",
  async (payload) => {
    const res = await likePost(payload);
    return res;
  }
);

const myPostsSlice = createSlice({
  name: "mypost",
  initialState: {
    isLoading: false,
    value: null,
    error: false,
  },
  extraReducers: {
    [fetchMyPostsData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMyPostsData.fulfilled]: (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    },
    [fetchMyPostsData.rejected]: (state) => {
      state.error = true;
    },
    [likeMyPostUpdate.fulfilled]: (state, action) => {
      const data = [...state.value].map((e) =>
        e._id === action.payload._id
          ? { ...e, likesCount: action.payload.likesCount }
          : e
      );
      state.value = data;
    },
  },
});

export { myPostsSlice };
