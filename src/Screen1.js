import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { image } from "./assets/images";

const Screen1 = () => {
  return (
    <div className="screen1">
      <div className="btns__container">
        <Link to="/imageslist">
          <Button variant="outlined" id="screen1__btn1">
            Button 1
          </Button>
        </Link>
        <Link to="/imageslist">
          <Button variant="outlined" id="screen1__btn2">
            Button 2
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Screen1;
