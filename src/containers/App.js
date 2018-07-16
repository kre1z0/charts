import React, { Component } from "react";

import { getRandomColor } from "../utils/utils";
import { DonutChart } from "../components/donut-chart/donut-chart";
import { PieChart } from "../components/pie-chart/pie-chart";
import { BarChart } from "../components/bar-chart/bar-chart";

import styles from "./App.scss";

const randomColors = length => Array.from({ length }, () => getRandomColor());

class App extends Component {
  render() {
    return (
      <div className="app-container">
        {/*<h2>Donut charts</h2>*/}
        {/*<div className={styles.row}>*/}
        {/*<DonutChart*/}
        {/*size={300}*/}
        {/*strokeWidth={44}*/}
        {/*precision={2}*/}
        {/*textProps={{*/}
        {/*style: {*/}
        {/*fontSize: 14,*/}
        {/*},*/}
        {/*}}*/}
        {/*svgChildren={*/}
        {/*<image*/}
        {/*x="150"*/}
        {/*y="150"*/}
        {/*className={styles.kappa}*/}
        {/*xlinkHref="https://vignette.wikia.nocookie.net/chillsonicfanon/images/5/5f/Kappa_emote.png/revision/latest?cb=20151006190205"*/}
        {/*alt="kappa"*/}
        {/*/>*/}
        {/*}*/}
        {/*/>*/}
        {/*<DonutChart*/}
        {/*colors={randomColors(10)}*/}
        {/*prefix="GDP"*/}
        {/*data={[40096, 8727, 30507, 57436, 8643, 38917].sort((a, b) => b - a)}*/}
        {/*labels={["England", "Brazil", "Italy", "USA", "China", "Japan"]}*/}
        {/*percentages={false}*/}
        {/*interactiveLegend={false}*/}
        {/*/>*/}
        {/*</div>*/}
        {/*<h2>Pie charts</h2>*/}
        {/*<div className={styles.row}>*/}
        {/*<PieChart precision={2} colors={randomColors(10)} labels={[]} offset={0} />*/}
        {/*<PieChart*/}
        {/*percentages={false}*/}
        {/*prefix=""*/}
        {/*data={[5, 4, 4, 2, 2, 1, 1, 1]}*/}
        {/*labels={[*/}
        {/*"Brazil",*/}
        {/*"Germany",*/}
        {/*"Italy",*/}
        {/*"Argentina",*/}
        {/*"Uruguay",*/}
        {/*"France",*/}
        {/*"Spain",*/}
        {/*"England",*/}
        {/*]}*/}
        {/*/>*/}
        {/*</div>*/}
        <h2>Bar charts</h2>
        <div className={styles.row}>
          <div style={{ marginBottom: 40 }}>
            <BarChart
              data={[122, 443, 324, 33, 454, 545, 234, 590, 444, 122, 322, 555]}
              colors={["rgba(100, 199, 108, 0.5)"]}
              labels={"Янв.Фев.Мар.Апр.Май.Июн.Июл.Авг.Сен.Окт.Ноя.Дек".split(".")}
            />
          </div>
          <div style={{ marginBottom: 40, width: "100%" }}>
            <BarChart responsive multiColors firsTickHidden={false} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
