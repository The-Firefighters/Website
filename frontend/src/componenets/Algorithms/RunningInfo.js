import React from 'react';
import './RunningInfo.css';

const RunningInfo = ({ algorithmResult, selectedAlgorithm }) => {
  const handlePrevious = () => {
    console.log('Previous step');
  };

  const handleNext = () => {
    console.log('Next step');
  };

  const handleFastForward = () => {
    console.log('Fast forward');
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
      </div>
      <div className="button-container">
        <button className="control-button" onClick={handlePrevious}>
          &#8592; Previous
        </button>
        <button className="control-button" onClick={handleNext}>
          Next &#8594;
        </button>
        <button className="control-button" onClick={handleFastForward}>
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