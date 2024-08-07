// LoadGraph.js
import React, { useState } from 'react';
import './LoadGraph.css';

const LoadGraph = ({ setNodes, setEdges }) => {
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
      ...node,
      x: node.x - centerX + svgWidth / 2,
      y: node.y - centerY + svgHeight / 2
    }));
  };

  const ensureUniqueIds = (nodes) => {
    let maxId = Math.max(...nodes.map(n => n.id), 0);
    return nodes.map(node => ({
      ...node,
      id: node.id || ++maxId
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
          if (data.nodes && data.edges) {
            const processedNodes = ensureUniqueIds(data.nodes.map((node, index) => ({
              id: node.id || index,
              label: node.label || `Node ${index + 1}`,
              x: node.x || Math.random() * 800,
              y: node.y || Math.random() * 600,
            })));
            
            const centeredNodes = centerGraph(processedNodes);
            
            const processedEdges = data.edges.map(edge => ({
              source: edge.source,
              target: edge.target,
            }));

            setNodes(centeredNodes);
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
  "nodes": [{"id": 1, "label": "Node 1"}, ...],
  "edges": [{"source": 1, "target": 2}, ...]
}`}
      </p>
    </div>
  );
};

export default LoadGraph;