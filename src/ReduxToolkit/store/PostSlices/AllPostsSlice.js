import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllPosts } from "../../../Api";

export const fetchAllPostsData = createAsyncThunk(
  "posts/fetchAllPostsData",
  async () => {
    const res = await getAllPosts();
    return res;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    value: null,
    error: false,
  },
  extraReducers: {
    [fetchAllPostsData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllPostsData.fulfilled]: (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    },
    [fetchAllPostsData.rejected]: (state) => {
      state.error = true;
    },
  },
});

export { postSlice };
