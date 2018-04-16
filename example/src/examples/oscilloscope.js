import * as React from "react";

import {
  SVGGraph as Graph,
  SVGPlot as Plot,
  SVGPointSeries as PointSeries
} from "react-graphesque";

const isPositiveY = ({ y }) => y > 0;
const isNegativeY = ({ y }) => y < 0;

export default ({
  width: w = 300,
  height: h = 150,
  points,
  positiveThreshold: high = 0.8,
  negativeThreshold: low = -0.8,
  selectItem,
  selectedItem
}) => {
  const hh = h / 2;
  const pos = points.filter(isPositiveY);
  const neg = points.filter(isNegativeY);
  const bucket = w / points.length;
  const bar = bucket * 0.75;
  return (
    <Graph>
      <PositivePlot y={0} width={w} height={hh} points={pos} threshold={high}>
        {({ point, input }) => {
          const selected = selectedItem === input;
          const fill = selected
            ? "green"
            : input.y >= high
              ? "darkblue"
              : "lightblue";

          return (
            <rect
              x={point.x + bucket / 2 - bar / 2}
              y={point.y}
              width={bar}
              height={-point.y}
              fill={fill}
              onMouseEnter={e => {
                e.stopPropagation();
                selectItem(input);
              }}
              onMouseLeave={e => {
                e.stopPropagation();
                selectItem({});
              }}
            />
          );
        }}
      </PositivePlot>
      <NegativePlot y={hh} width={w} height={hh} points={neg} threshold={low}>
        {({ point, input }) => (
          <rect
            x={point.x + bucket / 2 - bar / 2}
            y={0}
            width={bar}
            height={-point.y}
            fill={
              selectedItem === input
                ? "orange"
                : input.y <= low
                  ? "darkred"
                  : "pink"
            }
            onMouseEnter={e => {
              e.stopPropagation();
              selectItem(input);
            }}
            onMouseLeave={e => {
              e.stopPropagation();
              selectItem({});
            }}
          />
        )}
      </NegativePlot>
      <line x1={0} y1={hh} x2={w} y2={hh} stroke="cornflowerblue" />
    </Graph>
  );
};

const PositivePlot = props => <GeneralPlot {...props} inverted={true} />;

const NegativePlot = props => <GeneralPlot {...props} inverted={false} />;

const GeneralPlot = ({
  x,
  y,
  width,
  height,
  points,
  threshold,
  inverted,
  children,
  render = children
}) => (
  <Plot x={x} y={y} width={width} height={height} invertYAxis={inverted}>
    <ThresholdLine width={width} height={height} threshold={threshold} />
    <PointSeries points={points} renderPoint={render} />
  </Plot>
);

const ThresholdLine = ({ width, height, threshold }) => (
  <line
    x1={0}
    y1={-threshold * height}
    x2={width}
    y2={-threshold * height}
    stroke="grey"
    strokeDasharray="4, 4"
  />
);
