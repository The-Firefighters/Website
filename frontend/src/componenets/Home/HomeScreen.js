import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

function HomeScreen() {
  const TheProblem = "Explanation about the problem and who created the solutions";
  const Spreading = "The Spreading methode says that the vaccination can spread from the nodes to their neighbors just like the infection/fire";
  const NonSpreading = "The Spreading methode says that the vaccination cannot spread from the nodes to their neighbors just like the infection/fire, meaning that the vaccination is static";
  const MaxSave = "In the MaxSave algorithm, giving a certain budget, we need to save as many nodes that we can from the targeted nodes";
  const MinBudget = "In the MinBudget algorithm, we need to find the minimal budget that will save all the targeted nodes"; 

  return (
    <div className="home-screen">
      <div className="input-container">
        <h2>The Problem</h2>
        <div className="text-box">
          {TheProblem}
        </div>
        
        <h3>We have two methods for the firefighter problem:</h3>
        <div className="method-container">
          <div className="method">
            <h4>The Spreading methode</h4>
            <div className="text-box">
              {Spreading}
            </div>
          </div>
          <div className="method">
            <h4>The Non-Spreading methode</h4>
            <div className="text-box">
              {NonSpreading}
            </div>
          </div>
        </div>
        
        <h3>For each methode there are two types of algorithms:</h3>
        <div className="algorithm-container">
          <div className="algorithm">
            <h4>The MaxSave algorithm</h4>
            <div className="text-box">
              {MaxSave}
            </div>
          </div>
          <div className="algorithm">
            <h4>The MinBudget algorithm</h4>
            <div className="text-box">
              {MinBudget}
            </div>
          </div>
        </div>
        
        <Link to="/AlgorithmsPage" className="try-it-out-button">
          Try It Out!
        </Link>
      </div>
    </div>
  );
}

export default HomeScreen;