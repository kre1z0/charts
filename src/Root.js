import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Routes from './routes';
import App from "./containers/App";

import "./assets/fonts/fonts.scss";
import "./assets/base/main.scss";

class Root extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <App>{Routes}</App>
          </Switch>
        </Router>
    );
  }
}

export default Root;
