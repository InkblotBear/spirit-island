import { createSlice } from "@reduxjs/toolkit";

import { makeTheInvaderDeck } from "../board";

export const boardA = createSlice({
  name: "invaderDeck",
  initialState: makeTheInvaderDeck(),
  reducers: {
    advanceInvaderDeck: (
      invaderDeck,
    ) => {
        invaderDeck.ravage = invaderDeck.build;
        invaderDeck.build = invaderDeck.explore;

        if (invaderDeck.stage1.length > 0) {
          invaderDeck.explore = invaderDeck.stage1.pop()!;
        } else if (invaderDeck.stage2.length > 0) {
          invaderDeck.explore = invaderDeck.stage2.pop()!;
        } else {
          invaderDeck.explore = invaderDeck.stage3.pop();
        }
    },
  },
});

export const { advanceInvaderDeck } = boardA.actions;

export default boardA.reducer;
