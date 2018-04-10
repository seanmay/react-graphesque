import React, { Component } from "react";

import {
  SVGGraph as Graph,
  SVGPlot as Plot,
  SVGPointSeries as PointSeries,
  SVGLineSeries as LineSeries
} from "@graphesque/react";

import heatAlerts from "./heat-alerts";

const alertMonths = [
  ...new Set(
    heatAlerts.map(alert =>
      alert.date
        .split("-")
        .slice(0, 2)
        .join("-")
    )
  )
].sort();

const alertsPerMonth = alertMonths.map(
  month => heatAlerts.filter(alert => alert.date.startsWith(month)).length
);

const maxAlerts = Math.max(...alertsPerMonth);
const minAlerts = Math.min(...alertsPerMonth);
const floor = minAlerts - 1;
const ceiling = maxAlerts + 1 - floor;

const numberOfMonths = alertMonths.length;

const alertData = alertsPerMonth.map((alerts, i) => ({
  x: i / numberOfMonths,
  y: (alerts - floor) / ceiling
}));

const Circle = ({ point, input, rect, points }) => {
  console.log(rect);
  return (
    <circle
      cx={point.x + rect.width / points.length / 2}
      cy={point.y}
      r={3}
      fill="white"
      stroke={input.y >= 0.75 ? "red" : input.y >= 0.25 ? "orange" : "green"}
      strokeWidth={1}
    />
  );
};

export default class App extends Component {
  render() {
    return <div>
        <Graph renderWidth={600} renderHeight={400}>
          <Plot>
            <LineSeries points={alertData}>
              {({ line: [start, end], rect, lines }) => (
                <line
                  x1={start.point.x + rect.width / lines.length / 2}
                  y1={start.point.y}
                  x2={end.point.x + rect.width / lines.length / 2}
                  y2={end.point.y}
                  stroke={"grey"}
                />
              )}
            </LineSeries>
            <PointSeries points={alertData} renderPoint={Circle} />
          </Plot>
        </Graph>
      </div>;
  }
}
