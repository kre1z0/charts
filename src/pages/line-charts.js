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
      length: 26,
      min: 0,
      max: getRandomInt(0, 24000),
    }),
    data3: getRandomData({
      length: 12,
      min: 0,
      max: getRandomInt(0, 100),
    }),
  };

  render() {
    const { data1, data2, data3 } = this.state;

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
                  length: 26,
                  min: 0,
                  max: getRandomInt(0, 24000),
                }),
                data3: getRandomData({
                  length: 12,
                  min: 0,
                  max: getRandomInt(0, 100),
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
            centering={true}
            labels={Array.from({ length: 16 }, (_, index) => 2004 + index)}
          />
        </div>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <LineChart
            trapezoid
            pointSize={0}
            trapezeFill="rgba(231, 76, 60, 0.4)"
            data={data2}
            sectionWidth={70}
            labels={"abcdefghijklmnopqrstuvwxyz".split("")}
          />
        </div>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <LineChart
            trapezoid
            trapezeStrokeWidth={1}
            trapezeFill="rgba(56,123,199, 0.4)"
            trapezeStrokeColor="red"
            data={data3}
            labels={"Jan.Feb.Mar.Apr.May.June.July.Aug.Sept.Oct.Nov.Dec".split(".")}
          />
        </div>
      </div>
    );
  }
}
