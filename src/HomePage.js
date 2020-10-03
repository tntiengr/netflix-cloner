import React from "react";
import Row from "./Row";
import Requests from "./Requests";
import Banner from "./components/Banner";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { unVisible } from "./components/Navigator/NavigatorSlice";

function HomePage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  if (match.path === "/") dispatch(unVisible());

  return (
    <div className="app" style={{ paddingBottom: `3rem` }}>
      <Banner />
      <Row
        title="NETFLIX ORIGINAL"
        fetchURL={Requests.fetchNetflixOG}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchURL={Requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={Requests.fetchTopRate} />
      <Row title="Action Movies" fetchURL={Requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={Requests.fetchComedy} />
      <Row title="Horror Movies" fetchURL={Requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={Requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={Requests.fetchDocumentaries} />
    </div>
  );
}

export default HomePage;
