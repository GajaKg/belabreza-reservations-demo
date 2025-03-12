import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./scheduler";
import { Hotel } from "../Hotels.interface";

// Define a type for the slice state
export interface HotelsState {
  items: Hotel[];
  selectedItem?: Hotel,
  editItem?: Hotel,
}

// Define the initial state using that type
const initialState: HotelsState = {
  items: [],
  selectedItem: undefined,
  editItem: undefined
};

export const hotelsSlice = createSlice({
  name: "hotels",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    initItems: (state, action: PayloadAction<Hotel[]>) => {
      state.items = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<Hotel>) => {
      state.selectedItem = action.payload;
    },
    setEditItem: (state, action: PayloadAction<Hotel | undefined>) => {
      state.editItem = action.payload;
    },
    addHotel: (state, action: PayloadAction<Hotel>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addHotel, initItems, setEditItem, setSelectedItems } = hotelsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export default hotelsSlice.reducer;
