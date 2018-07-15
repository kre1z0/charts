import React, { Component } from "react";

import { DonutChart } from "../components/donut-chart/donut-chart";
import { PieChart } from "../components/pie-chart/pie-chart";

import styles from "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className={styles.row}>
          <DonutChart
            size={300}
            strokeWidth={44}
            precision={2}
            textProps={{
              style: {
                fontSize: 14,
              },
            }}
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
            prefix="GDP"
            data={[40096, 8727, 30507, 57436, 8643, 38917].sort((a, b) => b - a)}
            labels={["England", "Brazil", "Italy", "USA", "China", "Japan"]}
            percentages={false}
            interactiveLegend={false}
          />
          <PieChart precision={2} />
        </div>
      </div>
    );
  }
}

export default App;
