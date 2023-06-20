import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllPosts, likePost } from "../../../Api";

export const fetchAllPostsData = createAsyncThunk(
  "posts/fetchAllPostsData",
  async (page) => {
    const res = await getAllPosts(page);
    return res;
  }
);

export const likePostUpdate = createAsyncThunk(
  "posts/likePostUpdate",
  async (payload) => {
    const res = await likePost(payload);
    return res;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    value: [],
    error: false,
  },
  extraReducers: {
    [fetchAllPostsData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllPostsData.fulfilled]: (state, action) => {
      if (state.value?.length && action.payload) {
        state.value = [...state.value, ...action.payload];
      } else if (!action.payload) {
        state.value = [...state.value];
      } else {
        state.value = action.payload;
      }
      state.isLoading = false;
    },
    [fetchAllPostsData.rejected]: (state) => {
      state.error = true;
    },
    [likePostUpdate.fulfilled]: (state, action) => {
      const data = [...state.value].map((e) =>
        e._id === action.payload._id
          ? { ...e, likesCount: action.payload.likesCount }
          : e
      );
      state.value = data;
    },
  },
});

export { postSlice };
