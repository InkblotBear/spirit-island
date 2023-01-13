import { createSlice } from '@reduxjs/toolkit'

import { createBoardA, InvaderDeck, phases } from '../board';

export const boardA = createSlice({
    name: 'board',
    initialState: createBoardA(),
    reducers: {
        advanceInvaderDeck: (board, {payload: invaderDeck}:{payload: InvaderDeck, type: string}) => {
            if (invaderDeck.ravage) {
                phases.invaderRavage(board, invaderDeck.ravage)
              }
              if (invaderDeck.build) {
                phases.invaderBuild(board, invaderDeck.build)
              }
              if (invaderDeck.explore) {
                phases.invaderExplore(board, invaderDeck.explore)
              }
            }
    },
});

export const { advanceInvaderDeck } = boardA.actions;

export default boardA.reducer;