import React from 'react';
import './RunningInfo.css';

const RunningInfo = () => {
  const handlePrevious = () => {
    console.log('Previous step');
  };

  const handleNext = () => {
    console.log('Next step');
  };

  const handleFastForward = () => {
    console.log('Fast forward');
  };

  return (
    <div className="running-info">
      <div className="info-content">
        <p>Algorithm is running. Use the controls below to navigate through the steps.</p>
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
          {/* Log content will be populated here */}
          <p>Algorithm started...</p>
          <p>Processing step 1...</p>
          <p>Processing step 2...</p>
          {/* Add more log entries as needed */}
        </div>
      </div>
    </div>
  );
};

export default RunningInfo;