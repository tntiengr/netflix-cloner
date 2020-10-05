import { createSlice } from "@reduxjs/toolkit";

export const RowReducer = createSlice({
  name: "row-slice",
  initialState: {
    listMovie: [],
  },
  reducers: {
    addInMovieList: (state, action) => {
      state = {
        ...state,
        listMovie: state.listMovie.concat(action.payload),
      };
      return state;
      //   state.listMovie.concat(action.payload);
      //   return state;
    },
  },
});

export const { addInMovieList } = RowReducer.actions;
export default RowReducer.reducer;
