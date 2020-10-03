import React, { useRef, useEffect } from "react";
import "./OpeningSlider.scss";
import styles from "./OpeningSlider.module.scss";
import { TweenMax, Power3 } from "gsap";

function OpeningSlider(props) {
  const introText2 = useRef(null);
  const introText1 = useRef(null);
  const introText3 = useRef(null);
  const sliderRef = useRef(null);
  const intro = useRef(null);
  const crackRef = useRef(null);

  useEffect(() => {
    TweenMax.to(introText1.current, 3, {
      opacity: 1,
      y: `-50%`,
      ease: Power3.easeInOut,
    });
    TweenMax.to(introText2.current, 3, {
      opacity: 1,
      y: `-50%`,
      ease: Power3.easeInOut,
    });
    TweenMax.to(introText3.current, 3, {
      opacity: 1,
      y: `-50%`,
      ease: Power3.easeInOut,
    });
    TweenMax.to(crackRef.current, 1, {
      display: `none`,
      opacity: 0,
      delay: 3.2,
      ease: Power3.easeInOut,
    });
    TweenMax.to(sliderRef.current, 2, {
      y: `-100%`,
      delay: 3.8,
      ease: Power3.easeInOut,
    });
    TweenMax.to(intro.current, 1.8, {
      y: `-100%`,
      delay: 4,
      ease: Power3.easeInOut,
    });
  }, []);

  return (
    <div className="wrapper">
      <div ref={intro} className="intro">
        <div className="intro__text">
          <h1 className="intro__text--hide">
            <span
              ref={introText1}
              className={`${styles.first_child}`}
              aria-hidden="true"
            >
              Welcome To
              <br />
              Netflix Cloner
            </span>
            <span ref={introText2} className={styles.text}>
              Welcome To
              <br />
              Netflix Cloner
            </span>
            <span
              ref={introText3}
              className={`${styles.last_child}`}
              aria-hidden="true"
            >
              Welcome To
              <br />
              Netflix Cloner
            </span>
          </h1>
        </div>
      </div>
      <div ref={crackRef} className="crack-thunder"></div>
      <div ref={sliderRef} className="slider"></div>
    </div>
  );
}

export default OpeningSlider;
