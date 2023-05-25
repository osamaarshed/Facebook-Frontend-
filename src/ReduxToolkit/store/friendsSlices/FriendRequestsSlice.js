import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFriendRequests } from "../../../Api";

export const showFriendRequests = createAsyncThunk(
  "friendRequests/showFriendRequests",
  async () => {
    const res = await fetchFriendRequests();
    return res;
  }
);

const friendRequestsSlice = createSlice({
  name: "friendRequests",
  initialState: {
    isLoading: false,
    value: null,
    error: false,
  },
  //   reducers: {},
  extraReducers: {
    [showFriendRequests.pending]: (state) => {
      state.isLoading = true;
    },
    [showFriendRequests.fulfilled]: (state, action) => {
      state.value = action.payload;
      // console.log(action.payload, "hjea");
    },
    [showFriendRequests.rejected]: (state) => {
      state.error = true;
    },
  },
});

export { friendRequestsSlice };
