import React from 'react';
import logo from './logo.svg';
import './App.css';

import {phases, boardA, TerrainTypes} from './board';

function App() {
  console.log('before');
  console.log(boardA);
  phases.invader.invaderActions.build(boardA, [TerrainTypes.MOUNTAIN]);
  console.log('after');
  console.log(boardA);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          beeeeeeeans.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
