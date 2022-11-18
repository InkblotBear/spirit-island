import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {phases, createBoardA, TerrainTypes, Tile} from './board';
import { Dropdown, MenuProps } from 'antd';

function App() {
  const [board, setBoard] = useState(createBoardA());
  const [buildType, setBuildType] = useState(TerrainTypes.MOUNTAIN);
  const [exploreType, setExploreType] = useState(TerrainTypes.MOUNTAIN);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e);
    phases.invader.invaderActions.build(board, [buildType]);
    setBoard({...board});
  };
  
  const handleMenuClick: MenuProps['onClick'] = e => {
    console.log('click', e);
    setBuildType(e.key as TerrainTypes);
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
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  
  return (
    <div className="App">
      <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
        Build {buildType}
      </Dropdown.Button>

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
