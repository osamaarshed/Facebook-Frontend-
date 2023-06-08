import { createSlice } from "@reduxjs/toolkit";

const likeCountSlice = createSlice({
  name: "likeCount",
  initialState: {
    value: null,
  },
  reducers: {
    updateCount(state, action) {
      state.value = action.payload;
    },
  },
});

export { likeCountSlice };
export const { updateCount } = likeCountSlice.actions;
