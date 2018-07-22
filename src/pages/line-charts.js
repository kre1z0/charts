import React, { Component } from "react";

import { LineChart } from "../components/line-chart/line-chart";

export class LineCharts extends Component {
  render() {
    return (
      <div>
        <LineChart data={[444, 420, 350, 380, 480, 381, 375, 360]} lineWidth={2} centering={true} />
        <LineChart lineWidth={1} />
      </div>
    );
  }
}
