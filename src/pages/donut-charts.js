import React, { Component } from "react";

import { Button } from "../components/button/button";
import { DonutChart } from "../components/donut-chart/donut-chart";
import { getRandomColors } from "../utils/color";
import { getRandomData } from "../utils/utils";
import { getRandomInt } from "../utils/number";

import styles from "./pages.scss";

export class DonutCharts extends Component {
  state = {
    data1: getRandomData({ length: 6 }),
  };

  render() {
    const { data1 } = this.state;

    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Button
            onClick={() =>
              this.setState({
                data1: getRandomData({
                  length: 6,
                  min: 0,
                  max: getRandomInt(0, 24000),
                }),
              })
            }
          >
            Randomize Data
          </Button>
        </div>
        <div className={styles.row}>
          <DonutChart
            className={styles.chart}
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
            className={styles.chart}
            colors={getRandomColors(10)}
            data={data1}
            labels={["England", "Brazil", "Italy", "USA", "China", "Japan"]}
            percentages={false}
            interactiveLegend={false}
          />
        </div>
      </div>
    );
  }
}
