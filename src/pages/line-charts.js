import React, { Component } from "react";

import { Button } from "../components/button/button";
import { LineChart } from "../components/line-chart/line-chart";
import { getRandomData } from "../utils/utils";
import { getRandomInt } from "../utils/number";

export class LineCharts extends Component {
  state = {
    data1: getRandomData({
      length: 14,
      min: 0,
      max: getRandomInt(0, 24000),
    }),
    data2: getRandomData({
      length: 14,
      min: 0,
      max: getRandomInt(0, 24000),
    }),
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
                  length: 14,
                  min: 0,
                  max: getRandomInt(0, 24000),
                }),
                data2: getRandomData({
                  length: 14,
                  min: 0,
                  max: getRandomInt(0, 24000),
                }),
              })
            }
          >
            Randomize Data
          </Button>
        </div>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <LineChart
            data={data1}
            sectionWidth={90}
            centering={true}
            labels={Array.from({ length: 14 }, (_, index) => 2004 + index)}
          />
        </div>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <LineChart data={data2} sectionWidth={100} />
        </div>
      </div>
    );
  }
}
