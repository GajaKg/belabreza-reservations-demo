/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./scheduler";
import { Room } from "../Scheduler.interface";

// Define a type for the slice state
interface SchedulerState {
  rooms: Room[];
}

// Define the initial state using that type
const initialState: SchedulerState = {
  rooms: [],
};

export const schedulerSlice = createSlice({
  name: "scheduler",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    initItems: (state, action: PayloadAction<any>) => {
      state.rooms = action.payload;
    },
    addPeriod: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.rooms.push(action.payload);
    },
  },
});

export const { addPeriod, initItems } = schedulerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export default schedulerSlice.reducer;
