import { createSlice } from "@reduxjs/toolkit";

const selectedPostSlice = createSlice({
  name: "selectedPost",
  initialState: { value: null },
  reducers: {
    selectedPost(state, action) {
      state.value = action.payload;
    },
  },
});

export { selectedPostSlice };
export const { selectedPost } = selectedPostSlice.actions;
