import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {phases, createBoardA, TerrainTypes, Tile} from './board';

function App() {
  const [board, setBoard] = useState(createBoardA());
  const [buildType, setBuildType] = useState(TerrainTypes.MOUNTAIN);
  const [exploreType, setExploreType] = useState(TerrainTypes.MOUNTAIN)
  
  return (
    <div className="App">
      <button onClick={() => {
        setBuildType(TerrainTypes.WETLAND);
      }}>
        Set build type to {TerrainTypes.WETLAND}
      </button>
      <button onClick={() => {
        setBuildType(TerrainTypes.MOUNTAIN);
      }}>
        Set build type to {TerrainTypes.MOUNTAIN}
      </button>
      <button onClick={() => {
        setBuildType(TerrainTypes.DESERT);
      }}>
        Set build type to {TerrainTypes.DESERT}
      </button>
      <button onClick={() => {
        setBuildType(TerrainTypes.JUNGLE);
      }}>
        Set build type to {TerrainTypes.JUNGLE}
      </button>
      <button onClick={() => {
        phases.invader.invaderActions.build(board, [buildType]);
        setBoard({...board});
      }}>
        Build phase {buildType}
      </button>

      <button onClick={() => {
        setExploreType(TerrainTypes.WETLAND);
      }}>
        Set explore type to {TerrainTypes.WETLAND}
      </button>
      <button onClick={() => {
        setExploreType(TerrainTypes.MOUNTAIN);
      }}>
        Set explore type to {TerrainTypes.MOUNTAIN}
      </button>
      <button onClick={() => {
        setExploreType(TerrainTypes.DESERT);
      }}>
        Set explore type to {TerrainTypes.DESERT}
      </button>
      <button onClick={() => {
        setExploreType(TerrainTypes.JUNGLE);
      }}>
        Set explore type to {TerrainTypes.JUNGLE}
      </button>

      <button onClick={() => {
        phases.invader.invaderActions.explore(board, [exploreType]);
        setBoard({...board});
      }}>
        Explore phase {exploreType}
      </button>

      {Object.values(board).map((tile: Tile) => {
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
