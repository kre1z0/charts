import React from "react";

import { BarChart } from "../components/bar-chart/bar-chart";

export const BarCharts = () => {
  return (
    <div>
      <div style={{ marginBottom: 40, width: "100%" }}>
        <BarChart
          interactiveBars
          data={[
            [122, 443, 324, 33, 454, 545, 234, 590, 444, 122, 322, 555],
            [50, 21, 455, 300, 255, 123, 789, 369, 100, 50, 78],
            [415, 454, 212, 87, 85, 35, 787, 455, 98, 255],
          ]}
          colors={["#64c76c", "#ff9f00", "#003dff"]}
          labels={"Jan.Feb.Mar.Apr.May.June.July.Aug.Sept.Oct.Nov.Dec".split(".")}
        />
      </div>
      <div style={{ marginBottom: 40, width: "100%" }}>
        <BarChart interactiveBars responsive multiColors tooltipPrefix="%" />
      </div>
    </div>
  );
};
