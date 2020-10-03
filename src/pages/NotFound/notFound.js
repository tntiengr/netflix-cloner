import React from "react";
import PropTypes from "prop-types";
import "./NotFound.scss";

NotFound.propTypes = {};

function NotFound(props) {
  return (
    <div className="not-found__page">
      <h1 className="not-found__page__text">OOP! PAGE NOT FOUND...</h1>
    </div>
  );
}

export default NotFound;
