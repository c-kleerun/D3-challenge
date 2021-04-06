// @TODO: YOUR CODE HERE!
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("assets/data/data.csv").then((riskData) => {
  
  // turn strings to integers
  riskData.forEach((data) => {
    data.age = +data.age;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    data.abbr = data.abbr;
    data.income = +data.income;
  });
  
  // Add X axis
  var x = d3.scaleLinear()
    .domain([ (d3.min(riskData, d => d.poverty) - 2), (d3.max(riskData, d => d.poverty) + 2)])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([ (d3.min(riskData, d => d.obesity) - 2), (d3.max(riskData, d => d.obesity) + 2) ])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll('circle')
    .data(riskData)
    .enter()
    .append('circle')
      .attr('cx', ((d) => { return x(d.poverty); }) )
      .attr('cy', ((d) => { return y(d.obesity); }) )
      .attr('r', 10)
      .style('fill', 'lightblue')
      .attr('opacity', '.6')
  
      // add text
  svg.select('g')
    .selectAll('circle')
    .data(riskData)
    .enter()
    .append('text')
    .text(d => d.abbr)
      .attr('x', ((d) => { return x(d.poverty); }) )
      .attr('y', ((d) => { return y(d.obesity); }) )
      .attr('dy', -365)
      .attr('text-anchor', 'middle')
      .style('transform', 'translate(0px, 10px)')
      .attr('font-size', '12px')
      .attr('fill', 'black')

    // add labels
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - 50)
      .attr('x', 0 - 250)
      .attr('dy', '1em')
      .attr('class', 'axisText')
      .text('Obesity Rates (median)')

      svg.append('text')
      .attr('transform', `translate(${width / 2.5}, ${height + margin.top + 25})`)
      .attr('class', 'axisText')
      .text('In Poverty (%)')

});

