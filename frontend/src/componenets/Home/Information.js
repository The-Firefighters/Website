import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Information.css';

function Information() {
  const [activeDropdowns, setActiveDropdowns] = useState({});

  const toggleDropdown = (id) => {
    setActiveDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const dropdowns = [
    {
      id: 'problem',
      title: 'Test',
      content: "bla bla bla"
    },
    {
      id: 'spreading',
      title: 'The Spreading method',
      content: "The Spreading methode says that the vaccination can spread from the nodes to their neighbors just like infection/fire"
    },
    {
      id: 'nonSpreading',
      title: 'The Non-Spreading method',
      content: "The Spreading methode says that the vaccination cannot spread from the nodes to their neighbors just like infection/fire, meaning that the vaccination is static"
    },
    {
      id: 'maxSave',
      title: 'The MaxSave algorithm',
      content: "In the MaxSave algorithm, giving a certain budget, we need to save as many nodes that we can from the targeted nodes"
    },
    {
      id: 'minBudget',
      title: 'The MinBudget algorithm',
      content: "In the MinBudget algorithm, we need to find the minimal budget that will save all the targeted nodes"
    }
  ];

  return (
    <div className="information-page">
      <div className="input-container">
        <h2>Information</h2>
        
        {dropdowns.map((dropdown, index) => (
          <React.Fragment key={dropdown.id}>
            {index === 1 && <h3>test:</h3>}
            {index === 3 && <h3>test2:</h3>}
            <div className="dropdown">
              <div 
                className={`dropdown-header ${activeDropdowns[dropdown.id] ? 'active' : ''}`}
                onClick={() => toggleDropdown(dropdown.id)}
              >
                <h4>{dropdown.title}</h4>
              </div>
              <div className={`dropdown-content ${activeDropdowns[dropdown.id] ? 'active' : ''}`}>
                <p>{dropdown.content}</p>
              </div>
            </div>
          </React.Fragment>
        ))}

        <Link to="/AlgorithmsPage" className="try-it-out-button">
          Try It Out!
        </Link>
      </div>
    </div>
  );
}

export default Information;