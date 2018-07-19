import React, { Component } from "react";

import { Button } from "../components/button/button";
import { BarChart } from "../components/bar-chart/bar-chart";
import { getRandomData } from "../utils/utils";
import { getRandomInt } from "../utils/number";

export class BarCharts extends Component {
  state = {
    data1: getRandomData({
      length: 12,
      stackedLength: getRandomInt(0, 5),
      min: 0,
      max: getRandomInt(0, 24000),
    }),
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
                  length: 12,
                  stackedLength: getRandomInt(0, 5),
                  min: 0,
                  max: getRandomInt(0, 24000),
                }),
              })
            }
          >
            Randomize Data
          </Button>
        </div>
        <div style={{ marginBottom: 40, width: "100%" }}>
          <BarChart
            interactiveBars
            data={data1}
            colors={["#ff4056", "#ffe861", "#64c76c"]}
            labels={"Jan.Feb.Mar.Apr.May.June.July.Aug.Sept.Oct.Nov.Dec".split(".")}
          />
        </div>
        <div style={{ marginBottom: 40, width: "100%" }}>
          <BarChart responsive multiColors tooltipPrefix="%" />
        </div>
      </div>
    );
  }
}
