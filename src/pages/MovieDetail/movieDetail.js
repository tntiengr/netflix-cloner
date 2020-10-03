import React, { useState, useEffect, useRef } from "react";
import "./movieDetail.scss";
import YouTube from "react-youtube";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { visible } from "../../components/Navigator/NavigatorSlice";
import axios from "../../axios";
import Request from "../../Requests";
import { Link } from "react-router-dom";
import movieTrailer from "movie-trailer";
import { pointAtThisMovie } from "./movieDetailSlice";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

function MovieDetail(props) {
  const thisMovie = JSON.parse(localStorage.getItem("thismovie"));
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [movies, setListMovie] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  const [trailerURL, setTrailerUrl] = useState("");
  const [reload, setReload] = useState(false);

  const opts = {
    playerVars: {
      autoplay: 1,
      repeat: 1,
    },
  };

  if (match.path === "/movie-detail") dispatch(visible());

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    gsap.from(".movie-detail__grid", {
      duration: 1.2,
      y: "60",
      opacity: 0,
      ease: "ease-in",
      scrollTrigger: {
        trigger: ".movie-detail__grid",
        start: "top 70%",
        end: "top 70%",
        scrub: 1,
        toggleActions: `restart none reverse none`,
      },
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(Request.fetchActionMovies);
      let listMovie = [];
      for (let i = 0; i < 6; i++) {
        let index = Math.trunc(Math.random() * request.data.results.length);
        if (!listMovie.includes(request.data.results[index])) {
          listMovie.push(request.data.results[index]);
        } else {
          i = i - 1;
          continue;
        }
      }
      setListMovie(listMovie);
    }
    fetchData();
  }, []);

  function handleReRenderMovie(item) {
    const reRender = (item) => {
      return new Promise((resolve, reject) => {
        movieTrailer(
          item?.name ||
            item?.title ||
            item?.original_name ||
            item?.original_title ||
            ""
        )
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
            resolve(urlParams.get("v"));
          })
          .catch((err) => reject(err));
      });
    };
    reRender(item)
      .then((url) => {
        localStorage.setItem(
          "thismovie",
          JSON.stringify({
            ...item,
            trailer: url,
          })
        );
        dispatch(pointAtThisMovie({ ...item, trailer: url }));
      })
      .then(() => {
        if (reload === false) setReload(true);
        else setReload(false);
      });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className="movie-detail">
      {thisMovie && (
        <div>
          <div className="movie-detail__content">
            <div className="movie-detail__content__text-content">
              <img
                className="movie-detail__content__text-content__image"
                src={`${baseUrl}${thisMovie.poster_path}`}
                alt={thisMovie.name}
              />
              <div className="movie-detail__content__text-content__text">
                <h2 className="movie__name">
                  {thisMovie?.name ||
                    thisMovie?.title ||
                    thisMovie?.original_title}{" "}
                  <span>{thisMovie.vote_average}</span>
                </h2>
                <p className="movie__popularity">
                  Popularity: <span>{thisMovie.popularity}</span>
                </p>
                <p className="movie__language">
                  Language:{" "}
                  <span>
                    {thisMovie?.original_language ||
                      thisMovie?.origin_country[0]}
                  </span>
                </p>
                <p className="movie__release-date">
                  Release Date:{" "}
                  <span>
                    {thisMovie?.release_date || thisMovie?.first_air_date}
                  </span>
                </p>
                <p className="movie__overview__title">Overview:</p>
                <p className="movie__overview">
                  {thisMovie.overview.length > 300
                    ? thisMovie.overview.slice(0, 300) + " ..."
                    : thisMovie.overview}
                </p>
                <Link to={`/movie-detail/${thisMovie.id}`}>
                  <button className="movie--watch-it__button">WATCH NOW</button>
                </Link>
              </div>
            </div>
            <div className="movie-detail__content__trailer">
              <YouTube
                className="movie-detail__content__trailer__youtube"
                videoId={thisMovie.trailer}
                opts={opts}
              />
              <div className="trailer__youtube--override"></div>
            </div>
          </div>
          <div className="movie-detail__message">
            <h2>
              <p>
                <span>get better with great mindset </span>
                <span>get better with great mindset </span>
                <span>get better with great mindset </span>
                <span>get better with great mindset </span>
              </p>
            </h2>
          </div>
          <h1>Related film</h1>

          {movies && (
            <div className="movie-detail__grid">
              {movies.map((item, index) => {
                return (
                  <div className={`movie-detail__grid--container`}>
                    <h2>{item?.title || item?.name || item?.original_name}</h2>

                    <Link
                      className="movie-detail__grid__img_group"
                      to="/movie-detail"
                      onClick={() => handleReRenderMovie(item)}
                    >
                      <div className="movie-detail__grid--fade"></div>
                      <img
                        className="movie-detail__grid--container__image"
                        src={`${baseUrl}${item.backdrop_path}`}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
