import { createSlice } from "@reduxjs/toolkit";

const renderSlice = createSlice({
  name: "render",
  initialState: { value: false },
  reducers: {
    renderPost(state) {
      state.value = !state.value;
    },
  },
});

export { renderSlice };
export const { renderPost } = renderSlice.actions;
