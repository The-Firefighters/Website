import React, { useState, useCallback } from 'react';
import GraphBuilder from './GraphBuilder';
import ChooseAlgo from './ChooseAlgo';
import LoadGraph from './LoadGraph';
import './AlgorithmsPage.css';

const AlgorithmPage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [isGraphSaved, setIsGraphSaved] = useState(false);
  const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);
  const [sourceNode, setSourceNode] = useState('');
  const [targetNodes, setTargetNodes] = useState([]);
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState({});

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
      const newErrors = {};
      if (!selectedAlgorithm) newErrors.algorithm = 'Please select an algorithm';
      if (!sourceNode) newErrors.sourceNode = 'Please select a source node';
      if (selectedAlgorithm.toLowerCase().includes('maxsave') && !budget) {
        newErrors.budget = 'Please enter a budget';
      }

      if (Object.keys(newErrors).length === 0) {
        setIsAlgorithmRunning(true);
        // Run the algorithm here
      } else {
        setErrors(newErrors);
      }
    }
  };

  const handleSourceNodeChange = (nodeId) => {
    if (nodeId === "") return; // Ignore selection of the disabled option
    const newSourceNode = Number(nodeId);
    setSourceNode(newSourceNode);
    setErrors(prev => ({ ...prev, sourceNode: null }));
    
    setNodes(prevNodes => prevNodes.map(node => ({
      ...node,
      color: node.id === newSourceNode ? 'red' : (targetNodes.includes(node.id) ? 'white' : 'lightblue')
    })));
  };

  const handleTargetNodesChange = (nodeId) => {
    const newNodeId = Number(nodeId);
    setTargetNodes(prev => {
      const newTargets = prev.includes(newNodeId)
        ? prev.filter(id => id !== newNodeId)
        : [...prev, newNodeId];
      
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
                  setSelectedAlgorithm={(algo) => {
                    setSelectedAlgorithm(algo);
                    setErrors(prev => ({ ...prev, algorithm: null }));
                  }} 
                  disabled={isAlgorithmRunning}
                />
                {errors.algorithm && <div className="error">{errors.algorithm}</div>}
              </div>
              <div className="section">
                <strong>Source Node:</strong>
                <select 
                  value={sourceNode}
                  onChange={(e) => handleSourceNodeChange(e.target.value)}
                  disabled={isAlgorithmRunning}
                >
                  <option value="" disabled>Select a source node</option>
                  {nodes.map(node => (
                    <option key={node.id} value={node.id}>
                      Node {node.id}
                    </option>
                  ))}
                </select>
                {errors.sourceNode && <div className="error">{errors.sourceNode}</div>}
              </div>
              <div className="section">
                <strong>Target Nodes:</strong>
                <select 
                  multiple
                  value={targetNodes}
                  onChange={(e) => handleTargetNodesChange(e.target.value)}
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
                    onChange={(e) => {
                      setBudget(e.target.value);
                      setErrors(prev => ({ ...prev, budget: null }));
                    }}
                    placeholder="Enter budget (>0)"
                    disabled={isAlgorithmRunning}
                  />
                  {errors.budget && <div className="error">{errors.budget}</div>}
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