import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {phases, createBoardA, TerrainTypes, Tile, boardAAsGrid, Phases, makeTheInvaderDeck} from './board';
import { Col, Dropdown, MenuProps, Row } from 'antd';
import TileView from './components/TileView';

import produce from "immer";

function App() {
  const [board, setBoard] = useState(createBoardA());
  const [phase, setPhase] = useState(Phases.invaderRavage);
  const [invaderDeck, setInvaderDeck] = useState(makeTheInvaderDeck());

  
  return (
    <div className="App">
      <div>
          Ravage: [{invaderDeck.ravage?.join(', ')}],
          Build: [{invaderDeck.build?.join(', ')}],
          {/* TODO: Explore shouldn't be revealed until explore phase starts */}
          Explore: [{invaderDeck.explore?.join(', ')}]
      </div>
      <div onClick={() => {
        setBoard(produce((board) => {
          if (invaderDeck.ravage) {
            phases.invaderRavage(board, invaderDeck.ravage)
          }
          if (invaderDeck.build) {
            phases.invaderBuild(board, invaderDeck.build)
          }
          if (invaderDeck.explore) {
            phases.invaderExplore(board, invaderDeck.explore)
          }
        }));
        setInvaderDeck(invaderDeck.advanceInvaderCards());
      }}>Advance the Invader Deck</div>
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
                    <div>Pieces: {tile.pieces.map((piece) => typeof piece === "string" ? piece : piece.type).join(', ')}</div>
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
      <TileView tile={board[1]} setTile={() => null}/>
    </div>
  );
}

export default App;
