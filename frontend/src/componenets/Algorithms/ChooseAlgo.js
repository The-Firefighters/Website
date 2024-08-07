import React, { useState, useEffect, useCallback } from 'react';
import './ChooseAlgo.css';

const ChooseAlgo = ({ nodes, setNodes, isAlgorithmRunning, setIsAlgorithmRunning, shouldRunAlgorithm, setShouldRunAlgorithm }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [sourceNode, setSourceNode] = useState('');
  const [targetNodes, setTargetNodes] = useState([]);
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState({});

  const algorithms = [
    'Spreading MaxSave',
    'Spreading MinBudget',
    'Non-Spreading Dirlay MinBudget',
    'Non-Spreading MinBudget',
    'Heuristic Spreading Maxsave',
    'Heuristic Spreading MinBudget',
    'Heuristic Non-Spreading MinBudget'
  ];

  const validateInputs = useCallback(() => {
    const newErrors = {};
    if (!selectedAlgorithm) newErrors.algorithm = 'Please select an algorithm';
    if (sourceNode === '') newErrors.sourceNode = 'Please select a source node';
    if (selectedAlgorithm.toLowerCase().includes('maxsave')) {
      if (!budget) {
        newErrors.budget = 'Please enter a budget';
      } else if (!Number.isInteger(Number(budget)) || Number(budget) <= 0) {
        newErrors.budget = 'Budget must be a positive integer';
      } else if (!Number.isInteger(Number(budget))) {
        newErrors.budget = 'Budget must be an integer';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedAlgorithm, sourceNode, budget]);

  useEffect(() => {
    if (shouldRunAlgorithm) {
      const isValid = validateInputs();
      if (isValid) {
        setIsAlgorithmRunning(true);
        // Run the algorithm here
        console.log("Running algorithm with:", { selectedAlgorithm, sourceNode, targetNodes, budget });
      }
      // Delay setting shouldRunAlgorithm to false to allow error messages to display
      setTimeout(() => {
        setShouldRunAlgorithm(false);
      }, 100); // Adjust delay as needed
    }
  }, [shouldRunAlgorithm, validateInputs, setIsAlgorithmRunning, selectedAlgorithm, sourceNode, targetNodes, budget, setShouldRunAlgorithm]);

  const handleSourceNodeChange = (nodeId) => {
    if (nodeId === "") return;
    const newSourceNode = Number(nodeId);
    setSourceNode(newSourceNode);
    
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
    <div className="choose-algo">
      <div className="section">
        <h3>Choose Algorithm:</h3>
        <select 
          value={selectedAlgorithm} 
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          aria-label="Choose Algorithm"
          disabled={isAlgorithmRunning}
        >
          <option value="" disabled>Select an algorithm</option>
          {algorithms.map((algo, index) => (
            <option key={index} value={algo}>{algo}</option>
          ))}
        </select>
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
            step="1"
            value={budget} 
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter budget (positive integer)"
            disabled={isAlgorithmRunning}
          />
          {errors.budget && <div className="error">{errors.budget}</div>}
        </div>
      )}
    </div>
  );
};

export default ChooseAlgo;
