//this should allow us to switch between tabs 

import React from 'react';
import { Link } from 'react-router-dom'
import './Toolbar.css'; 


function Toolbar() {
  return (
    <div className="toolbar">
      <div className="toolbar-buttons">
        <Link to="/home-screen" className="toolbar-button">Home</Link>
        <Link to= "/AlgorithmsPage" className="toolbar-button">Algorithms</Link>
        <Link to="/contact" className="toolbar-button">Contact</Link>
      </div>
    </div>
  );
}

export default Toolbar;
