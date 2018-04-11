# react-graphesque API

- [SVGGraph](#svggraph)
- [SVGPlot](#svgplot)
- [SVGPointSeries](#svgpointseries)
- [SVGLineSeries](#svglineseries)

### `SVGGraph`

This element represents the `<svg>` base element, and is responsible for declaring the canvas size and aspect-ratio.

#### input
- `renderWidth` [optional] (`number`)  
define the width of the `svg.viewBox` (*default: 300*)
- `renderHeight` [optional] (`number`)  
define the height of the `svg.viewBox` (*default: 150*)

### `SVGPlot`
This element represents a viewport for values to be drawn within. The viewport provides a mechanism for translating and flipping the Y axis of all renderable child elements. It also provides a mechanism for clipping all children which render outside of the viewport.

#### input
- `x` [optional] (`number`)  
distance to move the `Plot` from the left edge of the `Graph` (*default: 0*)
- `y` [optional] (`number`)  
distance to move the `Plot` from the top edge of the `Graph` (*default: 0*)
- `width` [optional] (`number`)  
width of the `Plot` (*default: `graph.renderWidth` - `plot.x`*)
- `height` [optional] (`number`)  
height of the `Plot` (*default: `graph.renderHeight` - `plot.y`*)
- `invertYAxis` [optional] (`boolean`)  
whether to force renderable child elements to draw in negative-y space (*default: true*)

### `SVGPointSeries`
This element represents the means to draw a list of renderable entities. It takes a series of points, and a render prop (or child), and provides the render function with a props object containing:

#### render-prop arguments
`renderPoint={({ point, input, rect, points })=>SVGElement}`
- `point` (*a [`ProjectedPoint`](#projectedpoint) in viewport space*)
- `input` (*the original data object passed in*)
- `rect` (*the bounding `PointSeries` box in relative coordinates `{x,y,width,height}`*)
- `points` (*the list of all `ProjectedPoints` in this series*)

#### input 

- `points` [**REQUIRED**] (`Array<{x: number, y: number, [string]: any}>`)  
a list of inputs with `x`/`y` values as fractions of the domain/range, and any other properties to be passed through
- `renderPoint` or `children` [**REQUIRED**] (`(RenderArgs)=>SVGElement`)
- `x` [optional] (`number`)  
distance to move the Series from the left edge of the containing element (*default: 0*)
- `y` [optional] (`number`)  
distance to move the Series from the top edge of the containing element (*default: 0*)
- `width` [optional] (`number`)  
width of the Series (*default: inherited.width - `series.x`*)
- `height` [optional] (`number`)  
height of the Series (*default: inherited.height - `series.y`*)

### `SVGLineSeries`
This element is the same as the [`PointSeries`](#svgpointseries) above, except that it constructs line segments of neighbouring `Points`, and demands a different render name, and provides slightly modified render args, to be useful in a `Line` context.

#### render-prop arguments
`renderLine={({ line, rect, lines })=>SVGElement}`
- `line` (*a [`ProjectedLine`](#projectedline) in viewport space*)
- `rect` (*the bounding `LineSeries` box in relative coordinates `{x,y,width,height}`*)
- `lines` (*the list of all `ProjectedLines` in this series*)

#### input 

- `points` [**REQUIRED**] (`Array<{x: number, y: number, [string]: any}>`)  
a list of inputs with `x`/`y` values as fractions of the domain/range, and any other properties to be passed through
- `renderLine` or `children` [**REQUIRED**] (`(RenderArgs)=>SVGElement`)
- `x` [optional] (`number`)  
distance to move the Series from the left edge of the containing element (*default: 0*)
- `y` [optional] (`number`)  
distance to move the Series from the top edge of the containing element (*default: 0*)
- `width` [optional] (`number`)  
width of the Series (*default: inherited.width - `series.x`*)
- `height` [optional] (`number`)  
height of the Series (*default: inherited.height - `series.y`*)

### `ProjectedPoint`
A simple point in 2D space that has been converted to viewport space.  
`{ x: number, y: number }`

### `ProjectedLine`
A tuple (array) of `start` and `end`; objects representing the endpoints of the line segment.  
`[start, end]`  

Each has the following type:  
`{ point: ProjectedPoint, input: {x:number, y:number, [string]: any} }`