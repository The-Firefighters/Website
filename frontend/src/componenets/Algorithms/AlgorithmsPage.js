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
  const [isGraphSaved, setIsGraphSaved] = useState(false);
  const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);
  const [sourceNode, setSourceNode] = useState(null);
  const [targetNodes, setTargetNodes] = useState([]);

  const memoizedSetNodes = useCallback((newNodes) => {
    setNodes(newNodes);
  }, []);

  const memoizedSetEdges = useCallback((newEdges) => {
    setEdges(newEdges);
  }, []);

  const handleButtonClick = () => {
    if (!isGraphSaved) {
      setIsGraphSaved(true);
    } else {
      setIsAlgorithmRunning(true);
    }
  };

  const handleSourceNodeChange = (nodeId) => {
    setSourceNode(nodeId);
    setNodes(prevNodes => prevNodes.map(node => ({
      ...node,
      color: node.id === nodeId ? 'red' : (targetNodes.includes(node.id) ? 'white' : 'lightblue')
    })));
  };

  const handleTargetNodesChange = (nodeId) => {
    setTargetNodes(prev => {
      const newTargets = prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId];
      setNodes(prevNodes => prevNodes.map(node => ({
        ...node,
        color: node.id === sourceNode ? 'red' : (newTargets.includes(node.id) ? 'white' : 'lightblue')
      })));
      return newTargets;
    });
  };

  return (
    <div className="algorithm-page">
      <div className="content-wrapper">
        <div className="graph-box">
          <GraphBuilder 
            nodes={nodes} 
            setNodes={memoizedSetNodes} 
            edges={edges} 
            setEdges={memoizedSetEdges} 
            isGraphSaved={isGraphSaved}
          />
        </div>
        <div className="info-box">
          {!isGraphSaved && (
            <>
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
            </>
          )}
          {isGraphSaved && (
            <>
              <div className="section">
                <ChooseAlgo 
                  selectedAlgorithm={selectedAlgorithm} 
                  setSelectedAlgorithm={setSelectedAlgorithm} 
                  disabled={isAlgorithmRunning}
                />
              </div>
              <div className="section">
                <strong>Source Node:</strong>
                <select 
                  value={sourceNode || ''}
                  onChange={(e) => handleSourceNodeChange(Number(e.target.value))}
                  disabled={isAlgorithmRunning}
                >
                  <option value="">Select a source node</option>
                  {nodes.map(node => (
                    <option key={node.id} value={node.id}>
                      Node {node.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="section">
                <strong>Target Nodes:</strong>
                <select 
                  multiple
                  value={targetNodes}
                  onChange={(e) => handleTargetNodesChange(Number(e.target.value))}
                  disabled={isAlgorithmRunning}
                >
                  {nodes
                    .filter(node => node.id !== sourceNode)
                    .map(node => (
                      <option key={node.id} value={node.id}>
                        Node {node.id}
                      </option>
                    ))}
                </select>
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
                    disabled={isAlgorithmRunning}
                  />
                </div>
              )}
            </>
          )}
          <button 
            className={`run-algorithm ${isAlgorithmRunning ? 'disabled' : ''}`}
            onClick={handleButtonClick}
            disabled={isAlgorithmRunning}
          >
            {isGraphSaved 
              ? (isAlgorithmRunning ? "Algorithm Running..." : "Run the Algorithm!") 
              : "Save Graph"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmPage;