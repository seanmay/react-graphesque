import * as React from "react";

import {
  SVGGraph as Graph,
  SVGPlot as Plot,
  SVGPointSeries as PointSeries
} from "react-graphesque";

export default ({ points }) => (
  <React.Fragment>
    <Graph>
      <Plot>
        <PointSeries
          points={points}
          renderPoint={({ point, input }) => (
            <rect x={point.x} y={point.y} width={30} height={-point.y} />
          )}
        />
      </Plot>
    </Graph>
    <Graph>
      <Plot>
        <PointSeries
          points={points}
          renderPoint={({ point, input, rect, points }) => {
            const bucketWidth = rect.width / points.length;
            const halfBucketWidth = bucketWidth / 2;
            return (
              <rect
                x={point.x + halfBucketWidth}
                y={point.y}
                width={30}
                height={-point.y}
              />
            );
          }}
        />
      </Plot>
    </Graph>
    <Graph>
      <Plot>
        <PointSeries
          points={points}
          renderPoint={({ point, input, rect, points }) => {
            const bucketWidth = rect.width / points.length;
            const halfBucketWidth = bucketWidth / 2;
            const rectWidth = 30;
            const halfRectWidth = rectWidth / 2;
            return (
              <rect
                x={point.x + halfBucketWidth - halfRectWidth}
                y={point.y}
                width={rectWidth}
                height={-point.y}
              />
            );
          }}
        />
      </Plot>
    </Graph>
  </React.Fragment>
);
