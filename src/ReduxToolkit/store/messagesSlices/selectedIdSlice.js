import { createSlice } from "@reduxjs/toolkit";

const selectedIdSlice = createSlice({
  name: "selectedId",
  initialState: {
    value: null,
  },
  reducers: {
    setSelectedId(state, action) {
      state.value = action.payload;
    },
  },
});

export { selectedIdSlice };
export const { setSelectedId } = selectedIdSlice.actions;
