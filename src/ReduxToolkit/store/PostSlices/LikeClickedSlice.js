import { createSlice } from "@reduxjs/toolkit";

const likeClickedSlice = createSlice({
  name: "like",
  initialState: {
    // isLoading: false,
    value: false,
    // error: false,
  },
  reducers: {
    handleLikeState(state) {
      state.value = !state.value;
      console.log("state changing", state.value);
    },
  },
});

export { likeClickedSlice };
export const { handleLikeState } = likeClickedSlice.actions;
