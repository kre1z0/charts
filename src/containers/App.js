import React, { Component } from "react";

import BarChart from "../components/bar-chart/BarChart";
import { DonutChart } from "../components/donut-chart/donut-chart";

import styles from "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <DonutChart
          responsive
          textProps={{ className: styles.label }}
          svgChildren={
            <image
              x="150"
              y="150"
              height="100%"
              width="auto"
              className={styles.kappa}
              xlinkHref="https://vignette.wikia.nocookie.net/chillsonicfanon/images/5/5f/Kappa_emote.png/revision/latest?cb=20151006190205"
              alt="kappa"
            />
          }
        />
        {/*<div className="bar-1">*/}
        {/*<BarChart data={[122, 144, 158, 56]} />*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default App;
