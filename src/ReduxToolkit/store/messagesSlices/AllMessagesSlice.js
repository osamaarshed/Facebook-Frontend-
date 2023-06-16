import { createSlice } from "@reduxjs/toolkit";

const AllMessages = createSlice({
  name: "allmessages",
  initialState: {
    value: null,
  },
  reducers: {
    updateValues(state, action) {
      state.value = action.payload;
    },
  },
});

export { AllMessages };
export const { updateValues } = AllMessages.actions;
