import React, { Component } from "react";

import BarChart from "../components/bar-chart/BarChart";
import { DonutChart } from "../components/donut-chart/donut-chart";

import styles from "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <DonutChart data={[144, 25, 89, 44]} responsive>
          <img
            className={styles.kappa}
            src="https://vignette.wikia.nocookie.net/chillsonicfanon/images/5/5f/Kappa_emote.png/revision/latest?cb=20151006190205"
            alt="kappa"
          />
        </DonutChart>
        {/*<div className="bar-1">*/}
        {/*<BarChart data={[122, 144, 158, 56]} />*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default App;
