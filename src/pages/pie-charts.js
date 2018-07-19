import React, { Component } from "react";

import { Button } from "../components/button/button";
import { PieChart } from "../components/pie-chart/pie-chart";
import { getRandomColors } from "../utils/color";
import { getRandomData } from "../utils/utils";
import { getRandomInt } from "../utils/number";

import styles from "./pages.scss";

export class PieCharts extends Component {
  state = {
    data1: getRandomData({ length: 8 }),
    data2: getRandomData({ length: 10 }),
  };

  render() {
    const { data1, data2 } = this.state;

    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Button
            onClick={() =>
              this.setState({
                data1: getRandomData({
                  length: getRandomInt(1, 10),
                  min: 0,
                  max: getRandomInt(0, 24000),
                }),
                data2: getRandomData({
                  length: 10,
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
          <PieChart
            className={styles.chart}
            data={data1}
            precision={2}
            colors={getRandomColors(10)}
            labels={[]}
            offset={0}
          />
          <PieChart
            className={styles.chart}
            percentages={false}
            prefix=""
            data={data2}
            labels={[
              "Brazil",
              "Germany",
              "Italy",
              "Argentina",
              "France",
              "Spain",
              "England",
              "Denmark",
              "China",
              "Japan",
            ]}
          />
        </div>
      </div>
    );
  }
}
