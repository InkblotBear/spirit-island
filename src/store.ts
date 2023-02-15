import { configureStore } from "@reduxjs/toolkit";

import { Board, InvaderDeck } from "./board";

import board from "./features/boardA";
import invaderDeck from "./features/invaderDeck";
import phase, {Phases} from "./features/phases";
import spiritEnergy from "./features/spiritEnergy";

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
  spiritEnergy: {
    value: number
  }
}

export default configureStore<IRootState>({
  reducer: {
    board,
    invaderDeck,
    phase,
    spiritEnergy
  },
});
