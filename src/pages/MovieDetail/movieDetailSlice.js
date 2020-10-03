import { createSlice } from "@reduxjs/toolkit";

export const movieReducer = createSlice({
  name: "movie detail",
  initialState: {
    value: 1,
    movie: { id: 1223 },
  },
  reducers: {
    pointAtThisMovie: (state, action) => {
      state.movie = action.payload;
      console.log(state.movie);
    },
  },
});
export const { pointAtThisMovie } = movieReducer.actions;
export default movieReducer.reducer;
