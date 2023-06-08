import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showComments } from "../../../Api";

export const fetchCommentsData = createAsyncThunk(
  "comments/fetchCommentsData",
  async (payload) => {
    const res = await showComments(payload);
    return res;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: false,
    value: null,
    error: false,
  },
  extraReducers: {
    [fetchCommentsData.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCommentsData.fulfilled]: (state, action) => {
      state.value = action.payload;
    },
    [fetchCommentsData.rejected]: (state) => {
      state.error = true;
    },
  },
});

export { commentsSlice };
