import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  phases,
  createBoardA,
  TerrainTypes,
  Tile,
  boardAAsGrid,
  Phases,
  makeTheInvaderDeck,
} from "./board";
import { Col, Dropdown, MenuProps, Row } from "antd";
import TileView from "./components/TileView";

import produce from "immer";
import SpiritBoard from "./SpiritBoard";
import { useSelector } from "react-redux";

import { IRootState } from "./store";
import { advanceInvaderDeck } from "./features/boardA";

function App() {
  const board = useSelector<IRootState, IRootState["board"]>(
    (state) => state.board
  );
  const [phase, setPhase] = useState(Phases.invaderRavage);
  const [invaderDeck, setInvaderDeck] = useState(makeTheInvaderDeck());

  return (
    <div className="App">
      <div>
        Ravage: [{invaderDeck.ravage?.join(", ")}], Build: [
        {invaderDeck.build?.join(", ")}],
        {/* TODO: Explore shouldn't be revealed until explore phase starts */}
        Explore: [{invaderDeck.explore?.join(", ")}]
      </div>
      <div
        onClick={() => {
          advanceInvaderDeck(invaderDeck);
          setInvaderDeck(invaderDeck.advanceInvaderCards());
        }}
      >
        Advance the Invader Deck
      </div>
      {boardAAsGrid.map((row, rowIndex) => {
        return (
          <Row key={rowIndex} gutter={[16, 16]}>
            {row.map((id, colIndex) => {
              const style = {} as any;
              let renderState = true;
              if (
                rowIndex === 0 ||
                boardAAsGrid[rowIndex - 1][colIndex] !== id
              ) {
                style["border-top"] = "solid";
              }
              if (
                rowIndex === boardAAsGrid.length - 1 ||
                boardAAsGrid[rowIndex + 1][colIndex] !== id
              ) {
                style["border-bottom"] = "solid";
              }
              if (
                colIndex === 0 ||
                boardAAsGrid[rowIndex][colIndex - 1] !== id
              ) {
                style["border-left"] = "solid";
              }
              if (
                colIndex === boardAAsGrid[rowIndex].length - 1 ||
                boardAAsGrid[rowIndex][colIndex + 1] !== id
              ) {
                style["border-right"] = "solid";
              }

              if (
                rowIndex !== 0 &&
                boardAAsGrid[rowIndex - 1][colIndex] === id
              ) {
                renderState = false;
              }
              if (
                colIndex !== 0 &&
                boardAAsGrid[rowIndex][colIndex - 1] === id
              ) {
                renderState = false;
              }

              const tile = board[id];
              if (tile !== undefined) {
                return (
                  <Col style={style} key={colIndex} span={4}>
                    {renderState && (
                      <div>
                        <div>Id: {tile.id}</div>
                        <div>Terrain: {tile.terrain}</div>
                        <div>
                          Pieces:{" "}
                          {tile.pieces
                            .map((piece) =>
                              typeof piece === "string" ? piece : piece.type
                            )
                            .join(", ")}
                        </div>
                      </div>
                    )}
                  </Col>
                );
              }
              return (
                <Col style={style} key={colIndex} span={4}>
                  {renderState && (
                    <div>
                      <div>Id: 0</div>
                      <div>Terrain: Ocean</div>
                      <div>Pieces: </div>
                    </div>
                  )}
                </Col>
              );
            })}
          </Row>
        );
      })}
      <TileView tile={board[1]} setTile={() => null} />
      <SpiritBoard />
    </div>
  );
}

export default App;
