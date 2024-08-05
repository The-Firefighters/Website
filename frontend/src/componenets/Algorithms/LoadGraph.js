//this will allow the users to load a graph from a json file, we need to explain how our json file should be (maybe give an example that can be modified)
//or maybe we should consider chaning the json file to look like exactly in networkX
// LoadGraph.js
import React from 'react';
import './LoadGraph.css';

const LoadGraph = ({ setNodes, setEdges }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="load-graph">
      <h3>Load Graph</h3>
      <input type="file" accept=".json" onChange={handleFileUpload} />
    </div>
  );
};

export default LoadGraph;
