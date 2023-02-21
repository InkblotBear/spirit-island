import { createSlice } from "@reduxjs/toolkit";
const fearMaximum = 4
// TODO - fearMaximum is actually 4 times Player Count, but right now player count is only 1.

export const fearCount = createSlice({
    name: "fear",
    initialState: {
      value: 0,
      deck: null,
    },
    reducers: {
        fearCountChange: (
            fear,
            { payload: fearChange }: { payload: number; type: string }
          ) => {
            fear.value += fearChange;
            if (fear.value >= fearMaximum) {
              // fearDeck.active = fearDeck.deck.pop()!;
              // fear value overflows! how do? Loop?
              // fear.value -= fearMaximum
            }
      },
    },
  });
  
  export const { fearCountChange } = fearCount.actions;
  
  export default fearCount.reducer;