import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Toolbar from './components/Toolbar';
import HomeScreen from './components/Home/HomeScreen';
import Contact from './components/Home/Contact';
import Algorithm from './components/Algorithms/AlgorithmsPage';
import Information from './components/Home/Information';

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/AlgorithmsPage" element={<Algorithm />} />
        <Route path="/Information" element={<Information />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;