var w = 500, h = 500, pad = 50; // defining width and height of the SVG element; and a little padding for the plot

var svg = d3.select("#svg") // Select the plot element from the DOM
    .append("svg") // Append an SVG element to it
    .attr("height", h)
    .attr("width", w);
const dataset = [[5, 20, 30], [480, 90, 20], [250, 50, 100], [100, 33, 40], [330, 85, 60]];
var xScale = d3.scaleLinear() // For the X axis
    .domain([0, d3.max(dataset, function (d) { return d[0]; })])
    .range([pad, w - pad]);

var yScale = d3.scaleLinear() // For the Y axis
    .domain([0, d3.max(dataset, function (d) { return d[1]; })])
    .range([h - pad, pad]);

var rScale = d3.scaleLinear() // Custom scale for the radii
    .domain([0, d3.max(dataset, function (d) { return d[2]; })])
    .range([1, 30]); // Custom range, change it to see the effects!

// Axes
var xAxis = d3.axisBottom(xScale); // handy axes for any orientation
var yAxis = d3.axisLeft(yScale);

var circ = svg.selectAll("circle") // Returns ALL matching elements
    .data(dataset) // Bind data to DOM
    .enter() // Add one circle per such data point
    .append("circle")
    .attr("cx", function (d) { return xScale(d[0]); })
    .attr("cy", function (d) { return yScale(d[1]); })
    .attr("r", function (d) { return rScale(d[2]); })
    .attr("fill", "blue").attr("opacity", 0.5);