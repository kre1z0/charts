import React, { Component } from "react";

import { LineChart } from "../components/line-chart/line-chart";

export class LineCharts extends Component {
  render() {
    return (
      <div>
        <LineChart sectionWidth={90} centering={true} />
        <LineChart height={240} sectionWidth={100} data={[30, 12, 11, 9, 32, 28, 30, 20, 25, 44]} />
      </div>
    );
  }
}
