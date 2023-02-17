import { createSlice } from "@reduxjs/toolkit";

export const spiritEnergy = createSlice({
    name: "energy",
    initialState: {
      value: 0,
    },
    reducers: {
        spiritEnergyChange: (
            energy,
            { payload: energyChange }: { payload: number; type: string }
          ) => {
            energy.value += energyChange;
      },
    },
  });
  
  export const { spiritEnergyChange } = spiritEnergy.actions;
  
  export default spiritEnergy.reducer;
  