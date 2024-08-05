import React from 'react';
import './HomeScreen.css';

function HomeScreen() {
  const TheProblem = "Explanation about the problem and who created the solutions";
  const Algorithms = "Algorithms explanation";
  const Spreading = "The Spreading methode says that the vaccination can spread from the nodes to their neighbors just like the infection/fire";
  const NonSpreading = "The Spreading methode says that the vaccination cannot spread from the nodes to their neighbors just like the infection/fire, meaning that the vaccination is static";
  const MaxSave = "In the MaxSave algorithm, giving a certain budget, we need to save as many nodes that we can from the targeted nodes";
  const MinBudget = "In the MinBudget algorithm, we need to find the minimal budget that will save all the targeted nodes"; 


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
        <h3>We have two methods for the firefighte problem:</h3>
        <h4>The Spreading methode</h4>
        <textarea 
          className="data-input" 
          value={Spreading} 
          readOnly 
        />
        <h4>The Non-Spreading methode</h4>
        <textarea 
          className="data-input" 
          value={NonSpreading} 
          readOnly 
        />
        <h3>For each methode there are two types of algorithms:</h3>
        <h4>The MaxSave algorithm</h4>
        <textarea 
          className="data-input" 
          value={MaxSave} 
          readOnly 
        />
        <h4>The MinBudget algorithm</h4>
        <textarea 
          className="data-input" 
          value={MinBudget} 
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
