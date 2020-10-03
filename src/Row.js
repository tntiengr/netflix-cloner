import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "./axios";
import "./Row.scss";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { pointAtThisMovie } from "./pages/MovieDetail/movieDetailSlice";
import { useSelector, useDispatch } from "react-redux";

Row.propTypes = {
  title: PropTypes.string,
  isLargeRow: PropTypes.bool,
};
Row.defaultProps = {
  title: "Netflix Movies",
  isLargeRow: false,
};
const baseUrl = "https://image.tmdb.org/t/p/original/";

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

function Row(props) {
  const [movies, setMovies] = useState([]);
  const { title, fetchURL, isLargeRow } = props;
  const [trailerUrl, setTrailerUrl] = useState("");
  const slideRef = useRef();
  const movie = useSelector((state) => state.movie.movie);
  const dispatch = useDispatch();
  const [thisMovie, setThisMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  function handleShowYoutubeFr(movie) {
    if (trailerUrl) setTrailerUrl("");
    else {
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
    }
    setThisMovie(movie);
  }

  function slideNext() {
    slideRef.current.slickNext();
  }
  function slidPrv() {
    slideRef.current.slickPrev();
  }
  function handleWatchThisMovie() {
    if (thisMovie) {
      dispatch(
        pointAtThisMovie({
          ...thisMovie,
          trailer: trailerUrl,
        })
      );
      localStorage.setItem(
        "thismovie",
        JSON.stringify({ ...thisMovie, trailer: trailerUrl })
      );
    } else console.log("null");
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    speed: 500,
    arrows: false,
  };

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row__posters">
        <button className="next__button" type="button" onClick={slideNext}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <button className="prev__button" type="button" onClick={slidPrv}>
          <i class="fas fa-chevron-left"></i>
        </button>
        <Slider ref={slideRef} {...settings}>
          {movies.map((movie) => {
            return (
              <div key={movie.id}>
                <a className="row__posters__container">
                  <img
                    key={movie.id}
                    onClick={() => handleShowYoutubeFr(movie)}
                    className={` row__poster  ${
                      isLargeRow && "row__large-poster"
                    }  `}
                    src={`${baseUrl}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                    title={`Watch ${movie?.name || movie?.title}`}
                  />
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
      {trailerUrl && (
        <div className="row__youtube">
          <button className="row__youtube__button" type="button">
            <Link
              className="row__youtube__button__link"
              to="/movie-detail"
              onClick={handleWatchThisMovie}
            >
              WATCH IT NOW
            </Link>
          </button>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
