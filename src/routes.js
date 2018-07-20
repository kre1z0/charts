import React from "react";
// https://reacttraining.com/react-router/web/guides/philosophy
import { Route, Switch, Redirect } from "react-router-dom";

import { BarCharts } from "./pages/bar-charts";
import { DonutCharts } from "./pages/donut-charts";
import { PieCharts } from "./pages/pie-charts";
import { LineCharts } from "./pages/line-charts";

export default (
  <Switch>
    <Route exact path="/" component={BarCharts} />
    <Route path="/donut-charts" component={DonutCharts} />
    <Route path="/pie-charts" component={PieCharts} />
    <Route path="/line-charts" component={LineCharts} />
    <Route path="*" component={BarCharts}>
      <Redirect to="/" />
    </Route>
  </Switch>
);
