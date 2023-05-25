import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFriends } from "../../../Api";

export const fetchAllFriends = createAsyncThunk("", async () => {
  const res = await fetchFriends();
  //   console.log("asdkjsad");
  return res;
});

const showFriendsSlice = createSlice({
  name: "showFriends",
  initialState: {
    isLoading: false,
    value: null,
    error: false,
  },
  //   reducers: {},
  extraReducers: {
    [fetchAllFriends.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllFriends.fulfilled]: (state, action) => {
      state.value = action.payload;
    },
    [fetchAllFriends.rejected]: (state) => {
      state.error = true;
    },
  },
});

export { showFriendsSlice };
