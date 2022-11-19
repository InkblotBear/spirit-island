import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {phases, createBoardA, TerrainTypes, Tile} from './board';
import { Dropdown, MenuProps } from 'antd';

function App() {
  const [board, setBoard] = useState(createBoardA());
  const [buildType, setBuildType] = useState(TerrainTypes.MOUNTAIN);
  const [exploreType, setExploreType] = useState(TerrainTypes.MOUNTAIN);

  const handleBuildClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e);
    phases.invader.invaderActions.build(board, [buildType]);
    setBoard({...board});
  };
  
  const handleBuildTypeClick: MenuProps['onClick'] = e => {
    console.log('click', e);
    setBuildType(e.key as TerrainTypes);
  };

  const handleExploreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e);
    phases.invader.invaderActions.explore(board, [exploreType]);
    setBoard({...board});
  };
  
  const handleExploreTypeClick: MenuProps['onClick'] = e => {
    console.log('click', e);
    setExploreType(e.key as TerrainTypes);
  };
  
  const items: MenuProps['items'] = [
    {
      label: TerrainTypes.COASTAL,
      key: TerrainTypes.COASTAL,
    },
    {
      label: TerrainTypes.DESERT,
      key: TerrainTypes.DESERT,
    },
    {
      label: TerrainTypes.JUNGLE,
      key: TerrainTypes.JUNGLE,
    },
    {
      label: TerrainTypes.MOUNTAIN,
      key: TerrainTypes.MOUNTAIN,
    },
    {
      label: TerrainTypes.WETLAND,
      key: TerrainTypes.WETLAND,
    },
  ];
  
  const buildProps = {
    items,
    onClick: handleBuildTypeClick,
  };

  const exploreProps = {
    items,
    onClick: handleExploreTypeClick,
  };
  
  return (
    <div className="App">
      <Dropdown.Button menu={buildProps} onClick={handleBuildClick}>
        Build {buildType}
      </Dropdown.Button>

      <Dropdown.Button menu={exploreProps} onClick={handleExploreClick}>
        Explore {exploreType}
      </Dropdown.Button>

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
