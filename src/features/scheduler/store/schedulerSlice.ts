import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./scheduler";
import { Room } from "../Scheduler.interface";
// import { data } from "../../../mocks";

// Define a type for the slice state
interface SchedulerState {
  rooms: Room[];
}

// Define the initial state using that type
const initialState: SchedulerState = {
//   rooms: data,
  rooms: [],
};

export const schedulerSlice = createSlice({
  name: "scheduler",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addPeriod: (state, action: PayloadAction<Room>) => {
        state.rooms.push(action.payload);
        // state.rooms[0].periods.push(action.payload)
    },
    // remove: (state) => {},
  },
});

export const { addPeriod } = schedulerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default schedulerSlice.reducer;
