import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './GraphBuilder.css';

const Graph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [mockLine, setMockLine] = useState(null);
  const svgRef = useRef(null);
  const nodeId = useRef(0);

  const NODE_RADIUS = 10;
  const CLICK_AREA_RADIUS = 20;

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', 800)
      .attr('height', 600)
      .style('border', '1px solid black');

    const handleSvgRightClick = (event) => {
      if (isSaved || mockLine) return;
      event.preventDefault();
      const [x, y] = d3.pointer(event);
      if (nodes.some(node => Math.hypot(node.x - x, node.y - y) < CLICK_AREA_RADIUS)) return;
      const id = nodeId.current++;
      setNodes(prevNodes => [...prevNodes, { id, x, y }]);
    };

    const handleNodeRightClick = (event, node) => {
      event.preventDefault();
      event.stopPropagation();
      if (isSaved) return;
      
      if (!mockLine) {
        setMockLine({ source: node, x: node.x, y: node.y });
      } else if (mockLine.source.id !== node.id) {
        // Check for duplicate edges
        const isDuplicate = edges.some(edge => 
          (edge.source === mockLine.source.id && edge.target === node.id) ||
          (edge.source === node.id && edge.target === mockLine.source.id)
        );
        if (!isDuplicate) {
          setEdges(prevEdges => [...prevEdges, { source: mockLine.source.id, target: node.id }]);
        }
        setMockLine(null);
      } else {
        setMockLine(null);
      }
    };

    const handleNodeClick = (event, node) => {
      if (isSaved || mockLine) return;
      event.stopPropagation();
      setNodes(prevNodes => prevNodes.filter(n => n.id !== node.id));
      setEdges(prevEdges => prevEdges.filter(e => e.source !== node.id && e.target !== node.id));
    };

    const handleEdgeClick = (event, edge) => {
      if (isSaved) return;
      event.stopPropagation();
      setEdges(prevEdges => prevEdges.filter(e => e !== edge));
    };

    svg.on('contextmenu', handleSvgRightClick);

    const updateGraph = () => {
      const nodeSelection = svg.selectAll('.node')
        .data(nodes, d => d.id);

      const nodeEnter = nodeSelection.enter()
        .append('g')
        .attr('class', 'node')
        .on('contextmenu', handleNodeRightClick)
        .on('click', handleNodeClick);

      nodeEnter.append('circle')
        .attr('class', 'click-area')
        .attr('r', CLICK_AREA_RADIUS)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .style('fill', 'transparent')
        .style('cursor', 'pointer');

      nodeEnter.append('circle')
        .attr('class', 'visible-node')
        .attr('r', NODE_RADIUS)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .style('fill', 'blue');

      nodeEnter.append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .style('pointer-events', 'none')
        .text(d => d.id);

      nodeSelection.exit().remove();

      const edgeSelection = svg.selectAll('.edge')
        .data(edges, d => `${d.source}-${d.target}`);

      edgeSelection.enter()
        .append('line')
        .attr('class', 'edge')
        .merge(edgeSelection)
        .attr('x1', d => nodes.find(n => n.id === d.source)?.x)
        .attr('y1', d => nodes.find(n => n.id === d.source)?.y)
        .attr('x2', d => nodes.find(n => n.id === d.target)?.x)
        .attr('y2', d => nodes.find(n => n.id === d.target)?.y)
        .style('stroke', 'black')
        .style('stroke-width', 2)
        .on('click', handleEdgeClick);

      edgeSelection.exit().remove();

      svg.selectAll('.mock-line').remove();
      if (mockLine) {
        svg.append('line')
          .attr('class', 'mock-line')
          .attr('x1', mockLine.source.x)
          .attr('y1', mockLine.source.y)
          .attr('x2', mockLine.x)
          .attr('y2', mockLine.y)
          .style('stroke', 'red')
          .style('stroke-width', 2)
          .style('stroke-dasharray', '5,5');
      }
    };

    const handleMouseMove = (event) => {
      if (mockLine) {
        const [x, y] = d3.pointer(event);
        setMockLine(prev => ({ ...prev, x, y }));
      }
    };

    svg.on('mousemove', handleMouseMove);

    svg.node().addEventListener('contextmenu', (event) => event.preventDefault());

    updateGraph();

    return () => {
      svg.on('contextmenu', null);
      svg.on('mousemove', null);
      svg.node().removeEventListener('contextmenu', (event) => event.preventDefault());
    };
  }, [nodes, edges, isSaved, mockLine]);

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