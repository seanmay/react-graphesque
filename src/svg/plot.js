import * as React from "react";

import { GraphData } from "../tools/graph.provider";
import { PlotData } from "../tools/plot.provider";

const isFunction = f => typeof f === "function";

const renderContents = (children, render) =>
  isFunction(render) ? render() : isFunction(children) ? children() : children;

const ClippingMask = ({ id, x = 0, y = 0, width, height }) => (
  <defs>
    <clipPath id={id}>
      <rect x={x} y={y} width={width} height={height} />
    </clipPath>
  </defs>
);

const buildProps = (graph, input) => {
  const x = Number(input.x) || 0;
  const y = Number(input.y) || 0;
  const width = Number(input.width) || graph.renderWidth - x;
  const height = Number(input.height) || graph.renderHeight - y;

  const props = { graph, ...input, x, y, width, height };
  return props;
};

const withGraphData = Component => input => (
  <GraphData.Consumer>
    {graph => {
      const props = buildProps(graph, input);
      return <Component {...props} />;
    }}
  </GraphData.Consumer>
);

export const Plot = withGraphData(
  ({
    x,
    y,
    width,
    height,
    children,
    render,
    invertYAxis = true,
    id = Math.random(), // TODO: THIS IS SHAMEFUL. MAKE IT NOT BAD
    debug
  }) => {
    const ty = invertYAxis ? height + y : y;
    return (
      <PlotData.Provider value={{ invertYAxis, x, y, width, height }}>
        <ClippingMask
          id={id}
          y={invertYAxis ? -height : 0}
          width={width}
          height={height}
        />
        {debug ? (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={ debug.fill || "rgba(128, 128, 128, 0.25)" }
            stroke={ debug.stroke || "pink" }
          />
        ) : null}
        <g transform={`translate(${x}, ${ty})`} clipPath={`url(#${id})`}>
          {renderContents(children, render)}
        </g>
      </PlotData.Provider>
    );
  }
);
