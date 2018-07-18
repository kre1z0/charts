import React from "react";

import { BarChart } from "../components/bar-chart/bar-chart";

export const BarCharts = () => {
  return (
    <div>
      <div style={{ marginBottom: 40, width: "100%" }}>
        <BarChart
          interactiveBars
          tooltip={false}
          data={[122, 443, 324, 33, 454, 545, 234, 590, 444, 122, 322, 555]}
          colors={["#64c76c"]}
          labels={"Янв.Фев.Мар.Апр.Май.Июн.Июл.Авг.Сен.Окт.Ноя.Дек".split(".")}
        />
      </div>
      <div style={{ marginBottom: 40, width: "100%" }}>
        <BarChart responsive multiColors firsTickHidden={false} tooltipPrefix="%" />
      </div>
    </div>
  );
};
