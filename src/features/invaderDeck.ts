import { createSlice } from "@reduxjs/toolkit";

import { makeTheInvaderDeck } from "../board";
import phases, { Phases } from "./phases";

export const invaderDeck = createSlice({
  name: "invaderDeck",
  initialState: makeTheInvaderDeck(),
  reducers: {
    onPhaseChangeInvaderDeck: (
      invaderDeck,
      { payload: phaseValue }: { payload: Phases; type: string }
    ) => {
      if (phaseValue === Phases.advanceInvaderCards) {
        invaderDeck.ravage = invaderDeck.build;
        invaderDeck.build = invaderDeck.explore;

        if (invaderDeck.stage1.length > 0) {
          invaderDeck.explore = invaderDeck.stage1.pop()!;
        } else if (invaderDeck.stage2.length > 0) {
          invaderDeck.explore = invaderDeck.stage2.pop()!;
        } else {
          invaderDeck.explore = invaderDeck.stage3.pop();
        }
      }
    },
    reclaim: (
      powerDeck,
      {payload: amount} : {payload: number; type: string}
    ) => {
      null
    },
  },
});

export const { onPhaseChangeInvaderDeck } = invaderDeck.actions;

export default invaderDeck.reducer;
