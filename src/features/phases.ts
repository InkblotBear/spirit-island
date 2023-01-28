import { createSlice } from "@reduxjs/toolkit";

export enum Phases {
  spiritGrowth,
  spiritEnergy,
  spiritPlay,
  spiritFastPowers,
  boardBlightedIsland,
  boardFear,
  invaderExplore,
  invaderBuild,
  invaderRavage,
  spiritSlowPowers,
  timePasses,
}

const numberOfPhases = Phases.timePasses + 1;

export const phases = createSlice({
  name: "phase",
  initialState: {
    value: Phases.spiritGrowth,
  },
  reducers: {
    // advance phase by 1
    advanceToNextPhase: (state) => {
      state.value = (state.value + 1) % numberOfPhases;
    },
  },
});

export const { advanceToNextPhase } = phases.actions;

export default phases.reducer;
