import React, { Component } from "react";

import BarChart from "../components/bar-chart/BarChart";
import { DonutChart } from "../components/donut-chart/donut-chart";

import styles from "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className={styles.row}>
          <DonutChart
            precision={1}
            svgChildren={
              <image
                x="150"
                y="150"
                className={styles.kappa}
                xlinkHref="https://vignette.wikia.nocookie.net/chillsonicfanon/images/5/5f/Kappa_emote.png/revision/latest?cb=20151006190205"
                alt="kappa"
              />
            }
          />
          <DonutChart
            data={[40096, 8727, 30507, 57436, 8643, 38917]}
            labels={["England", "Brazil", "Italy", "USA", "China", "Japan"]}
            style={{ marginTop: "2rem" }}
          />
        </div>
        {/*<div className="bar-1">*/}
        {/*<BarChart data={[122, 144, 158, 56]} />*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default App;
