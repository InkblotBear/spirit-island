import React from 'react';
import logo from './logo.svg';
import './App.css';

import {phases, boardA, TerrainTypes, Tile} from './board';

function App() {
  console.log('before');
  console.log(boardA);
  // phases.invader.invaderActions.build(boardA, [TerrainTypes.MOUNTAIN]);
  console.log('after');
  console.log(boardA);
  
  return (
    <div className="App">
      {Object.values(boardA).map((tile: Tile) => {
        return <div>
          <div>Id: {tile.id}</div>
          <div>Terrain: {tile.terrain}</div>
          <div>Pieces: {tile.pieces.join(', ')}</div>
          <div>Touching: {tile.touching.join(', ')}</div>
          <br/>
        </div>
      })}
    </div>
  );
}

export default App;
