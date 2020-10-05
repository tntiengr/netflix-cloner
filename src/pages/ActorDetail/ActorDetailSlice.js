import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getItem = createAsyncThunk(
  "actor/getItem",
  async (params, thunkAPI) => {
    thunkAPI.dispatch(increaseValue());
    const listItems = await axios.get(
      "https://fortnite-api.theapinetwork.com/store/get"
    );

    return listItems.data.data;
  }
);
export const ActorReducer = createSlice({
  name: "actor-slice",
  initialState: {
    value: 0,
    loading: false,
    list: [],
  },
  reducers: {
    increaseValue: (state) => {
      state.value += 1;
    },
    decreaseValue: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: {
    [getItem.pending]: (state) => {
      state.loading = true;
    },
    [getItem.rejected]: (state) => {
      state.loading = false;
    },
    [getItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
  },
});

export const { increaseValue, decreaseValue } = ActorReducer.actions;
export default ActorReducer.reducer;
