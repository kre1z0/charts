import React, { Component } from "react";

import { MainMenu } from "../components/menu/menu";

import styles from "./App.scss";

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="app-container">
        <MainMenu {...this.props} />
        {children}
      </div>
    );
  }
}

export default App;
