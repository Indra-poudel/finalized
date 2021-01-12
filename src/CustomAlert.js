import React from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const CustomAlert = ({ redirectURL, cancelBtn, alertMessage }) => {
  Aos.init({});

  return (
    <div className="alert__container">
      <div
        data-aos="fade-down"
        data-aos-duration="500"
        data-aos-delay="150"
        data-aos-easing="ease-in"
        className="alert"
      >
        <h3>{alertMessage}</h3>
        <div className="alert__controls">
          <Link to={redirectURL}>
            proceed anyway <ArrowForwardIcon />{" "}
          </Link>
          {cancelBtn}
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
