import React from 'react';
import './HomeScreen.css';

function HomeScreen() {
  const TheProblem = "Explanation about the problem and who created the solutions";
  const Algorithms = "Algorithms explanation";

  return (
    <div className="home-screen">
      <h1>The Firefighter Problem</h1>
      <div className="input-container">
        <h2>The Problem</h2>
        <textarea 
          className="data-input" 
          value={TheProblem} 
          readOnly 
        />
        <h2>Solution</h2>
        <textarea 
          className="data-input" 
          value={Algorithms} 
          readOnly 
        />
        <button className="try-it-out-button">
          Try It Out!
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
