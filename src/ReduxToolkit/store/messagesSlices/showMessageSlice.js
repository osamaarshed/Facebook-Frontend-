import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showMessages } from "../../../Api";

export const fetchAllMessages = createAsyncThunk(
  "messages/fetchAllMessages",
  async (page) => {
    const res = await showMessages(page);
    return res;
  }
);

const showMessageSlice = createSlice({
  name: "messages",
  initialState: {
    isLoading: false,
    value: [],
    error: false,
  },
  extraReducers: {
    [fetchAllMessages.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllMessages.fulfilled]: (state, action) => {
      console.log("Action Payload: ", action.payload);

      if (state.value?.length && action.payload) {
        const newArr = [];
        state.value.forEach((e, i) => {
          let messages =
            action.payload.find((obj) => obj?._id === e?._id)?.messages || [];
          newArr.push({ ...e, messages: [...messages, ...e?.messages] });
        });

        state.value = newArr;
      } else {
        state.value = action.payload;
      }
      console.log("State Value: ", state.value);
      state.isLoading = false;
    },
    [fetchAllMessages.rejected]: (state) => {
      state.error = true;
    },
  },
});

export { showMessageSlice };
