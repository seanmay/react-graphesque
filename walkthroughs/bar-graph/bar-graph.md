### BarGraphs

If you think about it, a typical bar graph is really just about two points: whatever your `y` value is, and the **floor**.

If you can define `y` in relation to the **floor** and the **ceiling**, you have pretty much everything you need for a basic bar chart.
Because of that, you really only need to worry about providing points, and how you want to style your bars.

```jsx
import * as React from "react";
import {
  SVGGraph as Graph,
  SVGPlot as Plot,
  SVGPointSeries as PointSeries
} from "react-graphesque";

export const BarGraph = ({ points }) => (
  <Graph>
    <Plot>
      <PointSeries
        points={points}
        renderPoint={({ point, input }) => (
          <rect x={point.x} y={point.y} width={30} height={point.y * -1} />
        )}
      />
    </Plot>
  </Graph>
);
```

Here, we are using `-point.y` for the height. This is for a couple of reasons, we'll go further into later; but is basically to do with `point.y` being a negative number, to get the `y` axis to move up, rather than down.

We could instantiate that with some points.

```jsx
const App = () => (
  <BarGraph
    points={[
      { x: 0.0, y: 0.2 },
      { x: 0.2, y: 0.4 },
      { x: 0.4, y: 0.6 },
      { x: 0.6, y: 0.4 },
      { x: 0.8, y: 0.2 }
    ]}
  />
);

export default App;
```

And if you were to view that, in browser, it might look something like:

![](./bar-graph-01.svg?sanitize=true | width=300)

That's certainly a start, but it looks like there's still a little work to do. First, it appears that things are a little off-balance. I would expect the centre pillar to be centred, and I would expect an even amount of white-space on either side of the graph itself.

Let&rsquo;s resolve both of those problems at the same time. What we have is a simple case of objects that SVG refuses to render from the middle of the object, and rather they assume the top left corner. Handy sometimes, and frustrating other times... but here&rsquo;s how we can take charge and fix it.

We can visualize the graph in buckets. If we evenly divide the graph by the number of bars there are, then we know how many pixels are in each bucket. We don&t need to do that by hand, of course. You can if you would like; the default width of an `<SVGGraph>` is `300` (which is the default for `<svg>` in general).
But in terms which might be more intuitive, the width of the bucket is the width of the bar you see, plus the width of the empty space directly beside it.
All we need to do to centre the items is to render each one in the middle of its bucket.

But how?
Well, the middle of the bucket is going to be half-way, so it will be `something / 2`, in terms of pixels.
But what is the value of `something`? Well, the bucket is the width of the bar and the width of the space beside it... or, the width of the whole graph divided by the number of buckets we want. They produce the same number.

In this case, we know the `<Graph>` is 300 pixels, and we know we have 5 bars, so each bucket is 60 pixels.

So let&rsquo;s render the squares pushed over to half of the bucket width.

This time, we need to know how many points we have, and how wide the box is, that we are drawing in. The `PointSeries` will provide both of those things to do, so that you don't have to do too much bookkeeping on your own. We're going to add `rect` and `points` (plural) to the arguments of our render function.

```jsx
import * as React from "react";
import {
  SVGGraph as Graph,
  SVGPlot as Plot,
  SVGPointSeries as PointSeries
} from "react-graphesque";

export const BarGraph = ({ points }) => (
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
              height={point.y * -1}
            />
          );
        }}
      />
    </Plot>
  </Graph>
);
```

And what we get is

<svg viewBox="0 0 300 150" style="height: auto; width: 100%;"><defs><clipPath id="0.755444228719063"><rect x="0" y="-150" width="300" height="150"></rect></clipPath></defs><rect x="0" y="0" width="300" height="150" fill="white" /><g transform="translate(0, 150)" clip-path="url(#0.755444228719063)"><g transform="translate(0, 0)"><rect x="30" y="-30" width="30" height="30"></rect><rect x="90" y="-60" width="30" height="60"></rect><rect x="150" y="-90" width="30" height="90"></rect><rect x="210" y="-60" width="30" height="60"></rect><rect x="270" y="-30" width="30" height="30"></rect></g></g></svg>

Oof! Everything has shifted over to the other side of the graph.  
Well, it makes sense... Remember when I said that SVG will use the point you give it as the top left corner? So we have found the middle of the bucket. And that was an important first step. But now, we need to find the middle of the bar that we want centred, and we need to subtract the half-width of the bar from the half-width of the bucket, so that when the top left corner is provided, the middle of the bar lines up with the middle of the bucket.

```jsx
import * as React from "react";
import {
  SVGGraph as Graph,
  SVGPlot as Plot,
  SVGPointSeries as PointSeries
} from "react-graphesque";

export const BarGraph = ({ points }) => (
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
              height={point.y * -1}
            />
          );
        }}
      />
    </Plot>
  </Graph>
);
```

<svg viewBox="0 0 300 150" style="height: auto; width: 100%;"><defs><clipPath id="0.878118134875828"><rect x="0" y="-150" width="300" height="150"></rect></clipPath></defs><rect x="0" y="0" width="300" height="150" fill="white" /><g transform="translate(0, 150)" clip-path="url(#0.878118134875828)"><g transform="translate(0, 0)"><rect x="15" y="-30" width="30" height="30"></rect><rect x="75" y="-60" width="30" height="60"></rect><rect x="135" y="-90" width="30" height="90"></rect><rect x="195" y="-60" width="30" height="60"></rect><rect x="255" y="-30" width="30" height="30"></rect></g></g></svg>

Tada!

As you can see, there wasn&rsquo;t a whole lot of work we had to do to draw the bars or to get them centred. As well, most of the math is pretty straightforward.

You might be wondering why the left and right edges of the graph have smaller spaces than the spots in the middle. If you read through the steps of centering again, it should become apparent that the whitespaces that you see between two bars are half of the space on the right one one bar, and half the space on the left of the next bar. If there is only one bar, there is only half the space. There are ways to deal with that, that we can cover at a later point in time.

> If this work is so common, why not just make a graph that spits out these bars?

Well, I&rsquo;m glad you asked, self.