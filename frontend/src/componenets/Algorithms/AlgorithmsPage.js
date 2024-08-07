import React, { useState, useCallback } from 'react';
import GraphBuilder from './GraphBuilder';
import ChooseAlgo from './ChooseAlgo';
import LoadGraph from './LoadGraph';
import './AlgorithmsPage.css';

const AlgorithmPage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isGraphSaved, setIsGraphSaved] = useState(false);
  const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);
  const [shouldRunAlgorithm, setShouldRunAlgorithm] = useState(false);

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
      setShouldRunAlgorithm(true);
    }
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
            <ChooseAlgo 
              nodes={nodes}
              setNodes={setNodes}
              isAlgorithmRunning={isAlgorithmRunning}
              setIsAlgorithmRunning={setIsAlgorithmRunning}
              shouldRunAlgorithm={shouldRunAlgorithm}
              setShouldRunAlgorithm={setShouldRunAlgorithm}
            />
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
