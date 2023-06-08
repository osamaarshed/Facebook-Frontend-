import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showMessages } from "../../../Api";

export const fetchAllMessages = createAsyncThunk(
  "messages/fetchAllMessages",
  async () => {
    const res = await showMessages();
    return res;
  }
);

const showMessageSlice = createSlice({
  name: "messages",
  initialState: {
    isLoading: false,
    value: null,
    error: false,
  },
  extraReducers: {
    [fetchAllMessages.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllMessages.fulfilled]: (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    },
    [fetchAllMessages.rejected]: (state) => {
      state.error = true;
    },
  },
});

export { showMessageSlice };
