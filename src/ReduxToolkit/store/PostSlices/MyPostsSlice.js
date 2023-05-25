import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPosts } from "../../../Api";

export const fetchMyPostsData = createAsyncThunk("", async () => {
  const res = await getPosts();
  return res;
});

const myPostsSlice = createSlice({
  name: "mypost",
  initialState: { isLoading: false, value: null, error: false },
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
  },
});

export { myPostsSlice };
// export const { showPosts } = myPostsSlice.actions;
