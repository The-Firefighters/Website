import React, { useState } from 'react';
import GraphBuilder from './GraphBuilder';
import ChooseAlgo from './ChooseAlgo';
import LoadGraph from './LoadGraph';
import './AlgorithmsPage.css';

const AlgorithmPage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  return (
    <div className="AlgorithmsPage">

      <h1>Algorithm Page</h1>
      <div className="sidebar">
        <ChooseAlgo selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} />
        <LoadGraph setNodes={setNodes} setEdges={setEdges} />
      </div>
      <div className="graph-container">
        <GraphBuilder nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} isSaved={isSaved} setIsSaved={setIsSaved} />
      </div>
    </div>
  );
};

export default AlgorithmPage;
