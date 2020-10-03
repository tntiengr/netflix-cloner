import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import "./WatchingMovie.scss";
import YouTube from "react-youtube";
import { useDispatch } from "react-redux";
import { visible } from "../../components/Navigator/NavigatorSlice";

function WatchingMovie(props) {
  const dispatch = useDispatch();
  const movie = JSON.parse(localStorage.getItem("thismovie"));
  const match = useRouteMatch();
  if (match.path === `/movie-detail/${movie.id}`) dispatch(visible());
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="watching-frame">
      <YouTube
        className="watching-frame__video"
        videoId={movie.trailer}
        opts={opts}
      ></YouTube>
      <div className="watching-frame__text">
        <p>
          <span>get better with great mindset </span>
          <span>get better with great mindset </span>
          <span>get better with great mindset </span>
          <span>get better with great mindset </span>
          <span>get better with great mindset </span>
        </p>
      </div>
    </div>
  );
}

export default WatchingMovie;
