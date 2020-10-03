import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

Footer.propTypes = {};

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer__top-part">
        <div className="footer__top-part__logo">
          <Link to="/">
            <img
              className="footer__top-part__logo__img"
              src="https://www.dafont.com/forum/attach/orig/7/3/736247.png?1"
              alt="Netflix Logo"
            />
          </Link>
          <h1>CLONER</h1>
        </div>

        <div className="footer__top-part__about">
          <h2>ABOUT ME</h2>
          <p>TRUONG NHAT TIEN</p>
          <p>FE-DEV</p>
          <p>AQUAGR</p>
        </div>
        <div className="footer__top-part__contact">
          <h2>CONTACT</h2>
          <p>linessky78@gmail.com</p>
          <p>-this-is-phone-</p>
          <p>-ask-a-fish-</p>
        </div>
      </div>
      <div className="footer__br" />
      <div className="footer__bottom-part">
        <div className="footer__bottom-part__line-1">
          <a href="https://www.facebook.com/hackerakidosu.98/" target="_blank">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/tntien.gr/" target="_blank">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://github.com/tntiengr" target="_blank">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.skype.com/en/" target="_blank">
            <i class="fab fa-skype"></i>
          </a>
        </div>
        <div className="footer__bottom-part__line-2">
          <p>-Develop Thinking Of Possible-</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
