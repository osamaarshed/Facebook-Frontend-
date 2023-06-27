import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findAllUsers } from "../../../Api";

export const allUsers = createAsyncThunk("friends/findAllUsers", async () => {
  const res = await findAllUsers();
  return res;
});

const findAllUsersSlice = createSlice({
  name: "findAllUsers",
  initialState: {
    isLoading: false,
    value: [],
    error: false,
  },
  extraReducers: {
    [allUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [allUsers.fulfilled]: (state, action) => {
      state.value = action.payload;
    },
    [allUsers.rejected]: (state) => {
      state.error = true;
    },
  },
});

export { findAllUsersSlice };
