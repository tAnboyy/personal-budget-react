import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Chart = ({ budgetData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!budgetData || budgetData.length === 0) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Color scale
    const color = d3
      .scaleOrdinal()
      .domain(budgetData.map(d => d.title))
      .range(d3.schemeCategory10);

    // Pie generator
    const pie = d3
      .pie()
      .value(d => d.budget)
      .sort(null);

    // Arc generator
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius - 10);

    // Label arc (for positioning labels)
    const labelArc = d3
      .arc()
      .innerRadius(radius - 40)
      .outerRadius(radius - 40);

    // Create pie slices
    const arcs = g
      .selectAll(".arc")
      .data(pie(budgetData))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Add path elements (pie slices)
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.title))
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .style("opacity", 0.8);
        
        // Add tooltip
        const tooltip = d3.select("body")
          .append("div")
          .attr("class", "d3-tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.8)")
          .style("color", "white")
          .style("padding", "8px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none");
        
        tooltip
          .html(`${d.data.title}<br/>$${d.data.budget}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .style("opacity", 1);
        
        // Remove tooltip
        d3.selectAll(".d3-tooltip").remove();
      });

    // Add labels
    arcs
      .append("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .text(d => {
        // Only show label if slice is large enough
        const angle = d.endAngle - d.startAngle;
        return angle > 0.3 ? d.data.title : "";
      });

  }, [budgetData]);

  return (
    <div className="chart-container">
      <h3>Budget Distribution (D3.js)</h3>
      <div className="chart-wrapper">
        {budgetData && budgetData.length > 0 ? (
          <svg ref={svgRef}></svg>
        ) : (
          <div className="chart-placeholder">No data available</div>
        )}
      </div>
    </div>
  );
};

export default D3Chart;