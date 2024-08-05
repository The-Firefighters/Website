//this should allow choosing between algortihms, and after choosing will present the required state.
//EG -> a drop down displaying all the algortimhs, after choosing one, it will display the required/allowed operations
// ChooseAlgo.js

import React from 'react';
import './ChooseAlgo.css';

const ChooseAlgo = ({ selectedAlgorithm, setSelectedAlgorithm }) => {
  const algorithms = ['Algorithm 1', 'Algorithm 2', 'Algorithm 3'];

  return (
    <div className="choose-algo">
      <h3>Choose Algorithm</h3>
      <select value={selectedAlgorithm} onChange={(e) => setSelectedAlgorithm(e.target.value)}>
        <option value="" disabled>Select an algorithm</option>
        {algorithms.map((algo, index) => (
          <option key={index} value={algo}>{algo}</option>
        ))}
      </select>
    </div>
  );
};

export default ChooseAlgo;
