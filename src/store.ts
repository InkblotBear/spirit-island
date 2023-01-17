import { configureStore } from "@reduxjs/toolkit";

import { Board } from "./board";

import board from "./features/boardA";

export interface IRootState {
  board: Board;
}

export default configureStore({
  reducer: {
    board,
  },
});
