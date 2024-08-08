import React, { useState } from 'react';
import './LoadGraph.css';

const LoadGraph = ({ nodes, edges, setNodes, setEdges, onGraphDownload }) => {
  const [fileName, setFileName] = useState('');

  const centerGraph = (nodes) => {
    const minX = Math.min(...nodes.map(n => n.x));
    const maxX = Math.max(...nodes.map(n => n.x));
    const minY = Math.min(...nodes.map(n => n.y));
    const maxY = Math.max(...nodes.map(n => n.y));
    
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    
    const svgWidth = 800; // Adjust based on your SVG size
    const svgHeight = 600; // Adjust based on your SVG size
    
    return nodes.map(node => ({
      id: node.id,
      x: node.x - centerX + svgWidth / 2,
      y: node.y - centerY + svgHeight / 2
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (Array.isArray(data.nodes) && Array.isArray(data.edges)) {
            const processedNodes = centerGraph(data.nodes.map((node, index) => ({
              id: node.id || index,
              x: node.x || Math.random() * 800,
              y: node.y || Math.random() * 600,
            })));
            const processedEdges = data.edges.map(edge => ({
              source: edge.source,
              target: edge.target,
            }));

            setNodes(processedNodes);
            setEdges(processedEdges);
          } else {
            alert('Invalid file format. Please ensure your JSON file contains "nodes" and "edges" arrays.');
          }
        } catch (error) {
          alert('Error parsing JSON file. Please ensure the file is valid JSON.');
        }
      };
      reader.readAsText(file);
    }
  };

 const handleGraphDownload = () => {
  const data = {
    nodes: nodes.map(node => ({
      id: node.id,
      x: node.x,
      y: node.y
    })),
    edges: edges.map(edge => ({
      source: edge.source,
      target: edge.target
    }))
  };
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'graph.json');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="load-graph">
      <h3>Load Graph</h3>
      <div className="file-input-wrapper">
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="file-upload-label">
          {fileName || 'Choose a JSON file'}
        </label>
      </div>
      <p className="file-format-info">
        JSON format: {`{
  "nodes": [{"id": 1, "x": 100, "y": 200}, ...],
  "edges": [{"source": 1, "target": 2}, ...]
}`}
      </p>
      <div className="download-button-wrapper">
        <button className="download-button" onClick={handleGraphDownload}>
          Download Graph
        </button>
      </div>
    </div>
  );
};

export default LoadGraph;