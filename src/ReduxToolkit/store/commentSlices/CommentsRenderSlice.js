import { createSlice } from "@reduxjs/toolkit";

const commentsRenderSlice = createSlice({
  name: "commentsRender",
  initialState: {
    value: false,
  },
  reducers: {
    renderComments(state) {
      state.value = !state.value;
      console.log("Chal rha hai");
    },
  },
});

export { commentsRenderSlice };
export const { renderComments } = commentsRenderSlice.actions;
