import React, { useEffect, useState, useRef } from "react";
import "./Navigator.scss";
import calisLogo from "../../imgs/calisgrLogo.jpg";
import { Link } from "react-router-dom";
import { TweenMax, Power3 } from "gsap";

function Navigation(props) {
  const { hide } = props;
  const [show, handleShow] = useState(false);
  const navBar = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  useEffect(() => {
    TweenMax.to(navBar.current, 2, {
      opacity: 1,
      delay: 4,
      ease: Power3.easeInOut,
    });
  }, []);

  return (
    <div
      ref={navBar}
      className={`nav ${
        (show && "nav--show") || (!hide && "nav--show nav--show__relative")
      } `}
    >
      <div>
        <Link to="/">
          <img
            className="nav_logo-img"
            src="https://www.dafont.com/forum/attach/orig/7/3/736247.png?1"
            alt="Netflix Logo"
          />
        </Link>
      </div>

      <div className="nav__midddle">
        <ul className="nav__midddle__list-nav">
          <li>
            <Link className="nav__midddle__list-nav__item" to="/">
              POPULAR
            </Link>
          </li>

          <li>
            <Link className="nav__midddle__list-nav__item" to="/">
              TOP IMDB
            </Link>
          </li>
          <li>
            <Link className="nav__midddle__list-nav__item" to="/movie-detail">
              IMPRESSTION
              <ul className="nav__midddle__secondary-list">
                <span>
                  <li className="nav__midddle__secondary-list__item item-1">
                    <Link className="text__inside" to="/movie-detail">
                      KING KONG
                    </Link>
                  </li>
                </span>
                <span>
                  <li className="nav__midddle__secondary-list__item item-2">
                    <Link className="text__inside" to="/movie-detail">
                      AVENGERS
                    </Link>
                  </li>
                </span>
                <span>
                  <li className="nav__midddle__secondary-list__item item-3">
                    <Link className="text__inside" to="/actor-detail">
                      TOM HOOLAN
                    </Link>
                  </li>
                </span>
                <span>
                  <li className="nav__midddle__secondary-list__item item-4">
                    <Link className="text__inside" to="/actor-detail">
                      MIA KHALIFA
                    </Link>
                  </li>
                </span>
                <span>
                  <li className="nav__midddle__secondary-list__item item-5">
                    <Link className="text__inside" to="/movie-detail">
                      TOM & JERRY
                    </Link>
                  </li>
                </span>
                <span>
                  <li className="nav__midddle__secondary-list__item item-6">
                    <Link className="text__inside" to="/movie-detail">
                      PINK PANTHER
                    </Link>
                  </li>
                </span>
              </ul>
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav__right">
        <form>
          <input
            className="nav--search"
            placeholder="Lets find a movie!"
            type="text"
            name="nav-search"
            id="nav-search"
          />
        </form>
        <img className="nav_logo-img" src={calisLogo} alt="CalisGr Logo" />
      </div>
    </div>
  );
}

export default Navigation;
