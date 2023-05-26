import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllPosts, likePost } from "../../../Api";

export const fetchAllPostsData = createAsyncThunk(
  "posts/fetchAllPostsData",
  async () => {
    const res = await getAllPosts();
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
    [likePostUpdate.fulfilled]: (state, action) => {
      // console.log(action.payload, "Action.Payload");
      // console.log([...state.value], "State Value");
      const data = [...state.value].map((e) =>
        e._id === action.payload._id
          ? { ...e, likesCount: action.payload.likesCount }
          : e
      );
      // console.log(data, "DAata");
      state.value = data;
      // console.log(data, "state data");
      // console.log(state.value, "State Value");
    },
  },
});

export { postSlice };
