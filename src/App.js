import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/notFound";
import MovieDetail from "./pages/MovieDetail/movieDetail";
import HomePage from "./HomePage";
import Navigation from "./components/Navigator";
import ActorDetail from "./pages/ActorDetail/ActorDetail";
import { useSelector } from "react-redux";
import OpeningSlider from "./components/OpeningSlider/OpeningSlider";
import WatchingMovie from "./pages/WatchingMovie/WatchingMovie";
import Footer from "./components/Footer/Footer";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  const isHide = useSelector((state) => state.nav.hide);
  return (
    <div className="app">
      <OpeningSlider />
      <Router>
        <Navigation hide={isHide} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/movie-detail" exact component={MovieDetail} />
          <Route path={`/movie-detail/:movieId`} component={WatchingMovie} />
          <Route path="/actor-detail" component={ActorDetail} />
          <Route path="/search-page" component={SearchPage} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
