import { createSlice } from "@reduxjs/toolkit";

export const navReducer = createSlice({
  name: "navagation detail",
  initialState: {
    hide: true,
  },
  reducers: {
    visible: (state) => {
      state.hide = false;
    },
    unVisible: (state) => {
      state.hide = true;
    },
  },
});
export const { visible, unVisible } = navReducer.actions;
export default navReducer.reducer;
