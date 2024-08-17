import React, { useState, useEffect } from 'react';
import './RunningInfo.css';

const RunningInfo = ({ algorithmResult, selectedAlgorithm, currentStep, setCurrentStep }) => {
  const [maxStep, setMaxStep] = useState(0);

  useEffect(() => {
    if (algorithmResult && algorithmResult.DrawingResults) {
      setMaxStep(Object.keys(algorithmResult.DrawingResults).length);
    }
  }, [algorithmResult]);

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(maxStep, prev + 1));
  };

  const handleFastForward = () => {
    setCurrentStep(maxStep);
  };

  const formatStrategy = (strategy) => {
    return (
      <span className="strategy-list">
        [{strategy.map((tuple, index) => (
          <span key={index}>
            {JSON.stringify(tuple)}
            {index < strategy.length - 1 ? ',' : ''}
          </span>
        ))}]
      </span>
    );
  };

  const formatSavedTargetNodes = (nodes) => {
    return nodes.join(', ');
  };

  const renderAlgoResult = () => {
    if (!algorithmResult || !algorithmResult.algoResult) return null;

    const { algoResult } = algorithmResult;
    const isMaxSave = selectedAlgorithm.toLowerCase().includes('maxsave');

    return (
      <div className="algo-result">
        <h4>Algorithm Result:</h4>
        <ul>
          {isMaxSave ? (
            <>
              <li>
                <strong>Strategy:</strong> {formatStrategy(algoResult[0])}
              </li>
              <li>
                <strong>Saved Target Nodes:</strong> {formatSavedTargetNodes(algoResult[1])}
              </li>
            </>
          ) : (
            <>
              <li><strong>Budget:</strong> {algoResult[0]}</li>
              <li>
                <strong>Strategy:</strong> {formatStrategy(algoResult[1])}
              </li>
            </>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="running-info">
      <div className="info-content">
        <p>Algorithm has finished running. Use the controls below to navigate through the steps.</p>
        <p>Selected Algorithm: {selectedAlgorithm}</p>
        <p>Current Step: {currentStep} / {maxStep}</p>
      </div>
      <div className="button-container">
        <button className="control-button" onClick={handlePrevious} disabled={currentStep === 0}>
          &#8592; Previous
        </button>
        <button className="control-button" onClick={handleNext} disabled={currentStep === maxStep}>
          Next &#8594;
        </button>
        <button className="control-button" onClick={handleFastForward} disabled={currentStep === maxStep}>
          Fast Forward &#8594;|
        </button>
      </div>
      <div className="log-box">
        <h3>Log Output</h3>
        <div className="log-content">
          {algorithmResult ? (
            <pre>{JSON.stringify(algorithmResult, null, 2)}</pre>
          ) : (
            <p>Waiting for algorithm result...</p>
          )}
        </div>
      </div>
      {renderAlgoResult()}
    </div>
  );
};

export default RunningInfo;