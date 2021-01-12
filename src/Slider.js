import React from "react";

const Slider = ({ imageSrc, imageAlt, forwardButton, prevButton }) => {
  return (
    <div className="slider">
      {prevButton}
      <div className="slider__content">
        <img src={imageSrc} alt={imageAlt} />
      </div>
      {forwardButton}
    </div>
  );
};

export default Slider;
