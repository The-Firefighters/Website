//this should allow us to switch between tabs 

import React from 'react';
import './Toolbar.css'; // Make sure to create this CSS file for styling

function Toolbar() {
  return (
    <div className="toolbar">
      <h1 className="toolbar-title"></h1>
      <div className="toolbar-buttons">
        <button className="toolbar-button">Home</button>
        <button className="toolbar-button">Algorithms</button>
        <button className="toolbar-button">Contact</button>
      </div>
    </div>
  );
}

export default Toolbar;
