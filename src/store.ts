import { configureStore } from "@reduxjs/toolkit";

import { Board, InvaderDeck } from "./board";

import board from "./features/boardA";
import invaderDeck from "./features/invaderDeck";
import phase, {Phases} from "./features/phases";

interface NestedExample {
  nestedObject: {
    board: Board;
    invaderDeck: InvaderDeck;
  }
}

export interface IRootState {
  board: Board;
  invaderDeck: InvaderDeck;
  phase: {
    value: Phases;
    label: string;
  }
}

export default configureStore<IRootState>({
  reducer: {
    board,
    invaderDeck,
    phase,
  },
});
