import React, { useState, useCallback } from 'react';
import GraphBuilder from './GraphBuilder';
import ChooseAlgo from './ChooseAlgo';
import LoadGraph from './LoadGraph';
import './AlgorithmsPage.css';

const AlgorithmPage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [budget, setBudget] = useState('');

  const memoizedSetNodes = useCallback((newNodes) => {
    setNodes(newNodes);
  }, []);

  const memoizedSetEdges = useCallback((newEdges) => {
    setEdges(newEdges);
  }, []);

  return (
    <div className="algorithm-page">
      <div className="content-wrapper">
        <div className="graph-box">
          <GraphBuilder 
            nodes={nodes} 
            setNodes={memoizedSetNodes} 
            edges={edges} 
            setEdges={memoizedSetEdges} 
          />
        </div>
        <div className="info-box">
          <div className="section">
            <strong>Build a Graph:</strong>
            <ul>
              <li>To create a node, double-click in the drawing area.</li>
              <li>To create an edge, first click on the output node and then click on the destination node.</li>
              <li>Right-clicking deletes edges and nodes.</li>
            </ul>
          </div>
          <div className="section">
            <LoadGraph setNodes={memoizedSetNodes} setEdges={memoizedSetEdges} />
          </div>
          <div className="section">
            <ChooseAlgo selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} />
          </div>
          {selectedAlgorithm.toLowerCase().includes('maxsave') && (
            <div className="section">
              <strong>Add a Budget</strong>
              <input 
                type="number" 
                min="1" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter budget (>0)"
              />
            </div>
          )}
          <button className="run-algorithm">Run the Algorithm!</button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmPage;