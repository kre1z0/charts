import React, { Component } from "react";

import BarChart from "../components/bar-chart/BarChart";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="bar-1">
          <BarChart data={[122, 144, 158, 56]} />
        </div>
      </div>
    );
  }
}

export default App;
