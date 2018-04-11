import { createContext } from "react";

export const PlotData = createContext({
  invertYAxis: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0
});
