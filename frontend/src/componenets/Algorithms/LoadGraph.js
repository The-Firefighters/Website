//this will allow the users to load a graph from a json file, we need to explain how our json file should be (maybe give an example that can be modified)
//or maybe we should consider chaning the json file to look like exactly in networkX
// LoadGraph.js
import React, { useState } from 'react';
import './LoadGraph.css';

const LoadGraph = ({ setNodes, setEdges }) => {
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.nodes && data.edges) {
            // Process nodes to add positions if they're not provided
            const processedNodes = data.nodes.map((node, index) => ({
              id: node.id || index,
              label: node.label || `Node ${index + 1}`,
              // We'll let the GraphBuilder handle positioning
            }));
            
            // Process edges to ensure they use the correct node references
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