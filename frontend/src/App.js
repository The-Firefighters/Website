import React from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './componenets/Toolbar';
import HomeScreen from './componenets/Home/HomeScreen';

function App() {
  return (
    <div className="App">
       <Toolbar /> {/* Add the Toolbar component here */}
       <HomeScreen/> {/*bla*/}
        <p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
    </div>
  );
}

export default App;
