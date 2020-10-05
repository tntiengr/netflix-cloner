import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./pages/MovieDetail/movieDetailSlice";
import navReducer from "./components/Navigator/NavigatorSlice";
import ActorReducer from "./pages/ActorDetail/ActorDetailSlice";
import RowReducer from "./RowSlice";

export default configureStore({
  reducer: {
    movie: movieReducer,
    nav: navReducer,
    actor: ActorReducer,
    listMovie: RowReducer,
  },
});
