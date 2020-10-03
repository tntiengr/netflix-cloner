import React, { useState, useEffect } from "react";

import axios from "../../axios";
import Request from "../../Requests";
import "./Banner.scss";
import { Link } from "react-router-dom";
import movieTrailer from "movie-trailer";
import { useDispatch } from "react-redux";
import { pointAtThisMovie } from "../../pages/MovieDetail/movieDetailSlice";

function Banner(props) {
  const [movie, setMovies] = useState({});
  const [trailerURL, setTrailerUrl] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(Request.fetchTrending);
      const index = Math.trunc(Math.random() * request.data.results.length);
      const bannerMovie = request.data.results[index];
      setMovies(bannerMovie);
    }
    fetchData();
  }, []);

  function handlePlayMovie() {
    localStorage.setItem(
      "thismovie",
      JSON.stringify({
        ...movie,
        trailer: trailerURL,
      })
    );
    dispatch(pointAtThisMovie({ ...movie, trailer: trailerURL }));
  }

  movieTrailer(
    movie?.name ||
      movie?.title ||
      movie?.original_name ||
      movie?.original_title ||
      ""
  )
    .then((url) => {
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v"));
    })
    .catch((err) => console.log(err));

  return (
    <header
      className="banner"
      style={{
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <Link to="/movie-detail">
            <button className="banner__button" onClick={handlePlayMovie}>
              Play
            </button>
          </Link>
          <Link to="/movie-detail">
            <button className="banner__button">My List</button>
          </Link>
        </div>
        <h3 className="banner__descriptions">{movie?.overview}</h3>
      </div>
      <div className="banner--fade-bottom"></div>
    </header>
  );
}

export default Banner;
