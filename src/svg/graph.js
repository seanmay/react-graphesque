import * as React from "react";
import { GraphData } from "../providers/graph.provider";

export const Graph = ({
  renderWidth = 300,
  renderHeight = 150,
  width,
  height,
  children
}) => (
  <GraphData.Provider
    value={{
      renderWidth,
      renderHeight,
      ...(height && width ? { height, width } : {})
    }}
  >
    <svg
      viewBox={`0 0 ${renderWidth} ${renderHeight}`}
      {...(height && width
        ? { height, width }
        : { style: { height: "auto", width: "100%" } })}
    >
      {children}
    </svg>
  </GraphData.Provider>
);
