import { createSlice } from "@reduxjs/toolkit";

export const navReducer = createSlice({
  name: "navagation detail",
  initialState: {
    hide: true,
    searchKeyWord: "truongnhattien",
  },
  reducers: {
    visible: (state) => {
      state.hide = false;
    },
    unVisible: (state) => {
      state.hide = true;
    },
    searchTheKeyWord: (state, action) => {
      state.searchKeyWord = action.payload;
    },
  },
});
export const { visible, unVisible, searchTheKeyWord } = navReducer.actions;
export default navReducer.reducer;
