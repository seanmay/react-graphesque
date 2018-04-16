# react-graphesque

<!-- [![NPM](https://img.shields.io/npm/v/@graphesque/react.svg)](https://www.npmjs.com/package/@graphesque/react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) -->

First thing’s first; why _another_ graphing library?  
The simple answer is that this library is meant to help developers make custom graphs.

If you just need a visualization framework that will take your data and a title and give you a bar graph, or a line graph, I would argue that while it is simple to accomplish here, this is probably not the library for you, and that is OK.

If, however, you have been tasked with making graphs with custom styles, custom logic, and custom behaviour, and you have grown accustomed to juggling logic for computing values, and putting data points into the graph at the right point, mixed with rendering, and flipping the `y` value, and all of the rest...  
or, alternatively, you’ve been tasked with making a graphing library that lets people plug in data and see results...  
then please do read on.

**Graphesque** works by first _forcing you to separate your domain logic from your graphing algebra_, helping you with the latter, giving you a hook for rendering, and then getting out of your way. It’s not a &ldquo;graphing library&rdquo; so much as it&rsquo;s a _graphing library library_.

## API

[Lives here for now.](./API.md)

## Walkthroughs

- [Bar Graph basics](./walkthroughs/bar-graph/bar-graph.md)

*more to come*

## Install

```bash
npm install --save react-graphesque
```

## Usage

### Example 1: The Basics

To start, we need some data.

```javascript
const points = [
  { x: 0.2, y: 0.8 },
  { x: 0.4, y: 0.6 },
  { x: 0.6, y: 0.4 },
  { x: 0.8, y: 0.2 },
];
```
**Nota bene**: each point has an `x` and a `y`, and each value is a fractional value. For **Graphesque** to do it&rsquo;s job, each value for `x` and `y` **must** be _fractional_. This might seem like an arbitrary limitation, right now, but it will become empowering in the future, as you define the purpose for your graphs.

Now that we have data, we can include it in our example.
For now, only SVG is available as output, so let’s work with what we have.

```jsx
import {
  SVGGraph as Graph,
  SVGPlot as Plot,
  SVGPointSeries as PointSeries,
  SVGLineSeries as LineSeries
} from "react-graphesque";

const points = [
  { x: 0.2, y: 0.8 },
  { x: 0.4, y: 0.6 },
  { x: 0.6, y: 0.4 },
  { x: 0.8, y: 0.2 },
];

const Circle = ({ point }) => (
  <circle
    cx={point.x}
    cy={point.y}
    r={5} />
);

export const ExampleGraph = () => (
  <Graph>
    <Plot>
      <PointSeries points={points} renderPoint={Circle} />
    </Plot>
  </Graph>
);
```

If you render `ExampleGraph`, you should have 4 dots drawn across your screen, _descending_.

Let&rsquo;s take this example one step further, and connect the dots.

```jsx
const Circle = ({ point }) => (
  <circle
    cx={point.x}
    cy={point.y}
    r={arbitraryRadius}/>
);

const Line = ({ line: [start, end] }) => (
  <line
    x1={start.point.x}
    y1={start.point.y}
    x2={end.point.x}
    y2={end.point.y} />
);

export const ExampleGraph = () => (
  <Graph>
    <Plot>
      <LineSeries points={points} renderLine={Line} />
      <PointSeries points={points} renderPoint={Circle} />
    </Plot>
  </Graph>
);
```

The Points and the Lines will render just fine without a `Plot`, as well.

```jsx
export const ExampleGraph = () => (
  <Graph>
    <LineSeries points={points} renderLine={Line} />
    <PointSeries points={points} renderPoint={Circle} />
  </Graph>
);
```
Though if you do this, you might notice that the points (and lines) have flipped from descending to _ascending_ (more on that later).

## TODO
- support toggling clipping in `Plot`
- add `RadialSeries` for pies/doughnuts/et cetera
- add `CustomSeries` support
- add TypeScript types
- add test suite
- add API documentation
- add walkthroughs

Farther in the future:

- support `Canvas` as the backing renderer
- support React Native
- support other frameworks

## License

MIT © [seanmay](https://github.com/seanmay)
