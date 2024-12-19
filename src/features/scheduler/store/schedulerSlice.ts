/* eslint-disable @typescript-eslint/no-explicit-any */
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
  rooms: [
    {
      id: 1,
      name: "Soba #1",
      capacity: "4",
      periods: [
        {
          id: 1,
          start: new Date("12-04-2024").toDateString(),
          end: new Date("12-09-2024").toDateString(),
          status: "confirmed",
          note: "Neka informacija",
        },
        {
          id: 2,
          start: new Date("12-11-2024").toDateString(),
          end: new Date("12-13-2024").toDateString(),
          status: "confirmed",
          note: "Neka informacija",
        },
        {
          id: 3,
          start: new Date("12-17-2024").toDateString(),
          end: new Date("12-25-2024").toDateString(),
          status: "awaiting",
          note: "Neka informacija",
        },
      ],
    },
    {
      id: 2,
      name: "Soba #2",
      capacity: "4",
      periods: [
        {
          id: 1,
          start: new Date("12-01-2024").toDateString(),
          end: new Date("12-08-2024").toDateString(),
          status: "confirmed",
          note: "Neka informacija 12-01-2024",
        },
        {
          id: 2,
          start: new Date("12-13-2024").toDateString(),
          end: new Date("12-17-2024").toDateString(),
          status: "confirmed",
          note: "Neka informacija",
        },
        {
          id: 3,
          start: new Date("12-22-2024").toDateString(),
          end: new Date("12-30-2024").toDateString(),
          status: "awaiting",
          note: "Neka informacija",
        },
        {
          id: 4,
          start: new Date("12-17-2024").toDateString(),
          end: new Date("12-22-2024").toDateString(),
          status: "awaiting",
          note: "Neka informacija",
        },
        {
          id: 5,
          start: new Date("12-08-2024").toDateString(),
          end: new Date("12-13-2024").toDateString(),
          status: "disabled",
          note: "Neka informacija",
        },
        {
          id: 6,
          start: new Date("11-08-2024").toDateString(),
          end: new Date("11-13-2024").toDateString(),
          status: "disabled",
          note: "Neka informacija",
        },
      ],
    },
  ],
};

export const schedulerSlice = createSlice({
  name: "scheduler",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addPeriod: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      // state.rooms.push(action.payload);
      // state.rooms[0].periods.push(action.payload)
    },
    // remove: (state) => {},
  },
});

export const { addPeriod } = schedulerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default schedulerSlice.reducer;
