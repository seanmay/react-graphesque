import React from "react";

import BarGraph from "./examples/bars";

export default () => (
  <BarGraph
    points={[
      { x: 0.0, y: 0.2 },
      { x: 0.2, y: 0.4 },
      { x: 0.4, y: 0.6 },
      { x: 0.6, y: 0.4 },
      { x: 0.8, y: 0.2 },
    ]}
  />
);