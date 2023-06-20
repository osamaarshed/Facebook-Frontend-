import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showSpecificChat } from "../../../Api";

export const fetchSpecificMessages = createAsyncThunk(
  "messages/fetchSpecificMessages",
  async (payload) => {
    const res = await showSpecificChat(payload);
    return res;
  }
);

const showSpecificChatsSlice = createSlice({
  name: "specificMessages",
  initialState: {
    isLoading: false,
    value: [],
    error: false,
  },
  extraReducers: {
    [fetchSpecificMessages.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSpecificMessages.fulfilled]: (state, action) => {
      if (
        state.value?.length &&
        action.payload &&
        state.value[0]?.chatRoomId === action.payload[0].chatRoomId
      ) {
        let newArr = [];
        state.value?.forEach((item, i) => {
          let messages = item.messages;
          newArr.push({
            ...item,
            messages: [...action.payload[i].messages, ...messages],
          });
        });
        state.value = newArr;
      } else if (!action.payload) {
        state.value = [...state.value];
      } else {
        state.value = action.payload;
      }
      state.isLoading = false;
    },
    [fetchSpecificMessages.rejected]: (state) => {
      state.error = true;
    },
  },
});

export { showSpecificChatsSlice };
