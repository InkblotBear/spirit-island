import { createSlice } from "@reduxjs/toolkit";

export enum Phases {
  spiritGrowth,
  spiritEnergy,
  spiritPlay,
  spiritFastPowers,
  boardBlightedIsland,
  boardFear,
  invaderRavage,
  invaderBuild,
  invaderExplore,
  advanceInvaderCards,
  spiritSlowPowers,
  timePasses,
}

const phaseAsString = [
  "Growth Phase",
  "Gain Energy",
  "Play Powers",
  "Fast Powers",
  "Blighted Island",
  "Fear Card",
  "Ravage",
  "Build",
  "Explore",
  "Advance Invader Cards",
  "Slow Powers",
  "Time Passes",
];

const numberOfPhases = Phases.timePasses + 1;

export const phase = createSlice({
  name: "phase",
  initialState: {
    value: Phases.spiritGrowth,
    label: phaseAsString[Phases.spiritGrowth]
  },
  reducers: {
    // advance phase by 1
    advanceToNextPhase: (state) => {
      state.value = (state.value + 1) % numberOfPhases;
      state.label = phaseAsString[state.value]
    },
  },
});

export const { advanceToNextPhase } = phase.actions;

export default phase.reducer;
