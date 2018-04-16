import React from "react";

import Oscilloscope from "./examples/oscilloscope";

class OscilloscopeApp extends React.Component {
  constructor() {
    super();
    const points = Array.from({ length: 200 }, (_, i) => ({
      x: 1 / 200 * i,
      y: Math.sin(1 / 20 + 1 / 20 * i)
    }));
    this.state = { points, selectedItem: null };
  }

  render() {
    return (
      <Oscilloscope
        points={this.state.points}
        positiveThreshold={0.95}
        negativeThreshold={-0.75}
        selectedItem={this.state.selectedItem}
        selectItem={selectedItem => this.setState(state => ({ selectedItem }))}
      />
    );
  }
}

export default () => (
  <OscilloscopeApp />
);
