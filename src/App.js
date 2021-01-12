import React, { useState, useEffect } from "react";
import "./App.css";
import ImageList from "./ImageList";
import Screen1 from "./Screen1";
import Screen3 from "./Screen3";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/screen3">
            <Screen3 />
          </Route>
          <Route path="/imageslist">
            <ImageList />
          </Route>
          <Route path="/">
            <Screen1 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
