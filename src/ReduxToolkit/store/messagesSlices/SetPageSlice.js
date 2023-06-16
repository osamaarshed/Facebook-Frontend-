import { createSlice } from "@reduxjs/toolkit";

const setPageSlice = createSlice({
  name: "page",
  initialState: {
    value: 1,
  },
  reducers: {
    updatePage(state) {
      state.value = state.value + 1;
    },
  },
});

export { setPageSlice };
export const { updatePage } = setPageSlice.actions;
