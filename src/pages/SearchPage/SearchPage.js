import React, { useState, useEffect } from "react";
import "./SearchPage.scss";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { visible } from "../../components/Navigator/NavigatorSlice";
import { Link } from "react-router-dom";

function SearchPage(props) {
  const match = useRouteMatch();
  const [show, handleShow] = useState(false);
  const listMovie = useSelector((state) => state.listMovie.listMovie);
  const keyWord = useSelector((state) => state.nav.searchKeyWord);
  const dispatch = useDispatch();
  const [listSearchMovie, setListSearch] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  if (match.path === "/search-page") dispatch(visible());
  console.log(listMovie);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
  }, []);

  useEffect(() => {
    function finding() {
      const listItem = listMovie.filter((item) => {
        if (
          (item?.title || item?.name || item?.original_name)
            .toLowerCase()
            .search(keyWord.toLowerCase()) !== -1
        )
          return item;
      });
      setListSearch(listItem);
      console.log(listItem);
    }
    finding();
  }, [keyWord]);

  return (
    <div
      className="search-page"
      style={{ paddingTop: `${show ? "5rem" : "0rem"}` }}
    >
      <div className="search-page__list-movie">
        {!listSearchMovie && (
          <div
            style={{
              color: `#fff`,
              padding: `3rem 3rem`,
              fontSize: `2rem`,
              fontWeight: `500`,
            }}
          >
            Opp... We can't found your movie (⊙_⊙;)
          </div>
        )}
        {listSearchMovie && (
          <div>
            <p className="search-page__wrapper-item__title">{`Movie with keyword "${keyWord}"`}</p>

            <div className="search-page__wrapper-item">
              {listSearchMovie.map((item, index) => {
                return (
                  <Link
                    to="/movie-detail"
                    className="search-page__wrapper-item__item"
                  >
                    <img
                      className="search-page__wrapper-item__movie-cover"
                      key={index}
                      alt="movie-img"
                      src={`${baseUrl}${item.poster_path}`}
                    />
                    <h2>{item?.title || item?.name || item?.original_name}</h2>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
