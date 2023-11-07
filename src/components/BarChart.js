import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  const [data] = useState([200, 250, 60, 150, 100, 175]);
  const svgRef = useRef();

  useEffect(() => {
    // Setting up the svg container
    const w = 400;
    const h = 300;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible')
      .style('margin', '50px');

    // Setting the scaling
    const xScale = d3
      .scaleBand()
      .domain(data.map((val, i) => i))
      .range([0, w])
      .padding(0.5); // Adjusted padding for better visualization
    const yScale = d3.scaleLinear().domain([0, d3.max(data)]).nice().range([h, 0]);

    // Setting up the axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale)
                    .ticks(5);

    svg.append('g').call(xAxis).attr('transform', `translate(0,${h})`);
    svg.append('g').call(yAxis);

    // Setting the svg data
    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('x', (val, i) => xScale(i))
      .attr('y', (val) => yScale(val))
      .attr('width', xScale.bandwidth())
      .attr('height', (val) => h - yScale(val))
      .attr("fill", "#47B747")
      .attr('border','none')
      .attr('boreder-radius','5px');

  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
