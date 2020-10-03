import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./pages/MovieDetail/movieDetailSlice";
import navReducer from "./components/Navigator/NavigatorSlice";
export default configureStore({
  reducer: {
    movie: movieReducer,
    nav: navReducer,
  },
});
