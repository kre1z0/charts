import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./App.scss";

const MENU = [
  {
    label: "Bar-charts",
    route: "/",
  },
  {
    label: "Donut-charts",
    route: "/donut-charts",
  },
  {
    label: "Pie-charts",
    route: "/pie-charts",
  },
];

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="app-container">
        <ul>
          {MENU.map(({ label, route }, index) => (
            <Link key={`${label}-${index}`} to={route}>
              {label}
            </Link>
          ))}
        </ul>
        <h1>cheesecakejs</h1>
        description
        {children}
      </div>
    );
  }
}

export default App;
