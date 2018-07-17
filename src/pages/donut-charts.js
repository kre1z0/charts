import React from "react";

import { DonutChart } from "../components/donut-chart/donut-chart";
import { getRandomColors } from "../utils/color";

import styles from './pages.scss';

export const DonutCharts = () => {
  return (
    <div>
      <h2>Donut charts</h2>
      <div>
        <DonutChart
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
          colors={getRandomColors(10)}
          prefix="GDP"
          data={[40096, 8727, 30507, 57436, 8643, 38917].sort((a, b) => b - a)}
          labels={["England", "Brazil", "Italy", "USA", "China", "Japan"]}
          percentages={false}
          interactiveLegend={false}
        />
      </div>
    </div>
  );
};
