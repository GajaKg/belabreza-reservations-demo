import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../../scheduler/Scheduler.interface";
import { RootState } from "../../../store/store";
// import type { RootState } from "./scheduler";

// Define a type for the slice state
export interface CustomersState {
  customers: Customer[];
}

// Define the initial state using that type
const initialState: CustomersState = {
    customers: [],
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    initCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
  },
});

export const { initCustomers, addCustomer } = customersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCustomers = (state: RootState) => state.customers.customers


export default customersSlice.reducer;
