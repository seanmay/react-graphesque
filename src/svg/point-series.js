import * as React from "react";

import { GraphData } from "../tools/graph.provider";
import { PlotData } from "../tools/plot.provider";

const buildProps = (graph, plot, input) => {
  const x = Number(input.x) || 0;
  const y = Number(input.y) || 0;

  const width =
    Number(input.width) ||
    (Number(plot.width) || Number(graph.renderWidth)) - x;
  const height =
    Number(input.height) ||
    (Number(plot.height) || Number(graph.renderHeight)) - y;

  const props = { ...input, x, y, width, height, graph, plot };
  return props;
};

const withGraphAndPlotData = Component => input => (
  <GraphData.Consumer>
    {graph => (
      <PlotData.Consumer>
        {plot => {
          const props = buildProps(graph, plot, input);
          return <Component {...props} />;
        }}
      </PlotData.Consumer>
    )}
  </GraphData.Consumer>
);

export const PointSeries = withGraphAndPlotData(
  ({
    graph,
    plot,
    points,
    x,
    y,
    width,
    height,
    children,
    renderPoint = children,
    debug
  }) => {
    const direction = plot.invertYAxis ? -1 : 1;
    const normalizedPoints = points.map(point => ({
      x: width * point.x,
      y: direction * point.y * height
    }));
    const rect = {
      x: x,
      y: y,
      width: width,
      height: height
    };
    return (
      <React.Fragment>
        {debug ? (
          <rect
            x={x}
            y={plot.invertYAxis ? -plot.height + y : y}
            width={width}
            height={height}
            fill={debug.fill || "rgba(128, 128, 128, 0.25)"}
            stroke={debug.stroke || "cornflowerblue"}
          />
        ) : null}

        <g
          transform={`translate(${x}, ${
            plot.invertYAxis ? -plot.height + (y + height) : y
          })`}
        >
          {normalizedPoints.map((point, i) =>
            renderPoint({
              point,
              input: points[i],
              rect,
              points: normalizedPoints
            })
          )}
        </g>
      </React.Fragment>
    );
  }
);
