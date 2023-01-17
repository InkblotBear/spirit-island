import { configureStore } from "@reduxjs/toolkit";

import { Board, InvaderDeck } from "./board";

import board from "./features/boardA";
import invaderDeck from "./features/invaderDeck";

export interface IRootState {
  board: Board;
  invaderDeck: InvaderDeck;
}

export default configureStore({
  reducer: {
    board,
    invaderDeck,
  },
});
