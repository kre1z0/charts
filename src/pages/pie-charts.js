import React from "react";

import { PieChart } from "../components/pie-chart/pie-chart";
import { getRandomColors } from "../utils/color";

import styles from "./pages.scss";

export const PieCharts = () => {
  return (
    <div className={styles.row} style={{ justifyContent: "center" }}>
      <PieChart precision={2} colors={getRandomColors(10)} labels={[]} offset={0} />
      <PieChart
        percentages={false}
        prefix=""
        data={[5, 4, 4, 2, 2, 1, 1, 1]}
        labels={[
          "Brazil",
          "Germany",
          "Italy",
          "Argentina",
          "Uruguay",
          "France",
          "Spain",
          "England",
        ]}
      />
    </div>
  );
};
