//this is the manual graph building script, 
// eg - clicking on the screen will generate a node, clicking on a node will create an edge to be sticked with another node
// right click - delete, left click - create

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './GraphBuilder.css';

const Graph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const svgRef = useRef(null);
  const nodeId = useRef(0);

  useEffect(() => { // the screen size where you create and display the graph
    const svg = d3.select(svgRef.current)
      .attr('width', 800)
      .attr('height', 600)
      .style('border', '1px solid black');

    const handleRightClick = (event) => { 
      if (isSaved) return;
      event.preventDefault();
      const [x, y] = d3.pointer(event);
      const id = nodeId.current++;
      setNodes([...nodes, { id, x, y }]);
    };

    const handleNodeRightClick = (event, node) => {
      if (isSaved) return;
      event.stopPropagation();
      event.preventDefault();
      const [x, y] = d3.pointer(event);
      const newEdge = { source: node.id, target: null, x, y };
      setEdges([...edges, newEdge]);

      const handleNodeClick = (event, targetNode) => {
        setEdges(edges.map(e => (e === newEdge ? { ...e, target: targetNode.id } : e)));
        svg.selectAll('.node').on('click', null);
      };

      svg.selectAll('.node')
        .on('click', (event, targetNode) => handleNodeClick(event, targetNode));
    };

    const handleNodeClick = (event, node) => { // delte the node and all the edges from or to it
      if (isSaved) return;
      event.stopPropagation();
      setNodes(nodes.filter(n => n.id !== node.id));
      setEdges(edges.filter(e => e.source !== node.id && e.target !== node.id));
    };

    const handleEdgeClick = (event, edge) => { // delete the edge while right clicking on it 
      if (isSaved) return;
      event.stopPropagation();
      setEdges(edges.filter(e => e !== edge));
    };

    svg.on('contextmenu', handleRightClick);

    const updateGraph = () => {
      // Nodes
      const nodeSelection = svg.selectAll('.node')
        .data(nodes, d => d.id);

      const nodeEnter = nodeSelection.enter()
        .append('g')
        .attr('class', 'node')
        .on('contextmenu', handleNodeRightClick)
        .on('click', handleNodeClick);

      nodeEnter.append('circle')
        .attr('r', 10)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .style('fill', 'blue');

      nodeEnter.append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .text(d => d.id);

      nodeSelection.exit().remove();

      // Edges
      const edgeSelection = svg.selectAll('.edge')
        .data(edges, d => `${d.source}-${d.target}`);

      edgeSelection.enter()
        .append('line')
        .attr('class', 'edge')
        .attr('x1', d => nodes.find(n => n.id === d.source)?.x)
        .attr('y1', d => nodes.find(n => n.id === d.source)?.y)
        .attr('x2', d => d.target !== null ? nodes.find(n => n.id === d.target)?.x : d.x)
        .attr('y2', d => d.target !== null ? nodes.find(n => n.id === d.target)?.y : d.y)
        .style('stroke', 'black')
        .style('stroke-width', 2)
        .on('click', handleEdgeClick);

      edgeSelection.exit().remove();
    };

    updateGraph();
  }, [nodes, edges, isSaved]);

  const handleSaveGraph = () => {
    setIsSaved(true);
  };

  return (
    <div>
      <button onClick={handleSaveGraph} disabled={isSaved}>Save Graph</button>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Graph;
