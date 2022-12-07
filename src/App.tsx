import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {phases, createBoardA, TerrainTypes, Tile, boardAAsGrid} from './board';
import { Col, Dropdown, MenuProps, Row } from 'antd';

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

      {boardAAsGrid.map((row, rowIndex) => {
        return <Row key={rowIndex} gutter={[16, 16]}>
          {row.map((id, colIndex) => {
            const style = {} as any;
            let renderState = true;
            if (rowIndex === 0 || boardAAsGrid[rowIndex-1][colIndex] !== id) {
              style['border-top'] = 'solid';
            } 
            if (rowIndex === boardAAsGrid.length - 1 || boardAAsGrid[rowIndex+1][colIndex] !== id) {
              style['border-bottom'] = 'solid';
            }
            if (colIndex === 0 || boardAAsGrid[rowIndex][colIndex-1] !== id) {
              style['border-left'] = 'solid';

            }
            if (colIndex === boardAAsGrid[rowIndex].length - 1 || boardAAsGrid[rowIndex][colIndex+1] !== id) {
              style['border-right'] = 'solid';
            }

            if (rowIndex !== 0 && boardAAsGrid[rowIndex-1][colIndex] === id) {
              renderState = false;
            }
            if (colIndex !== 0 && boardAAsGrid[rowIndex][colIndex-1] === id) {
              renderState = false;
            }


            const tile = board[id];
            if (tile !== undefined) {
              return <Col style={style} key={colIndex} span={4}>
                {renderState && (
                  <div>
                    <div>Id: {tile.id}</div>
                    <div>Terrain: {tile.terrain}</div>
                    <div>Pieces: {tile.pieces.join(', ')}</div>
                  </div>
                )}
              </Col>  
            }          
            return <Col style={style} key={colIndex} span={4}>
              {renderState && (
                <div>
                  <div>Id: 0</div>
                  <div>Terrain: Ocean</div>
                  <div>Pieces: </div>
                </div>
              )}
            </Col>
          })}
        </Row>
      })}
    </div>
  );
}

export default App;
