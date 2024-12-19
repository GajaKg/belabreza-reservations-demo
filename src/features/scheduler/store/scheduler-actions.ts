import { Dispatch } from "@reduxjs/toolkit";
import { initItems } from "./schedulerSlice";
import axios from 'axios';
import { Period } from "../Scheduler.interface";

export const fetchData = () => {
  return async (dispatch: Dispatch) => {
    const retrieveData = async () => {
      const response = await axios.get(`http://localhost:3000/rooms`);
      return await response.data;
    };

    try {
      const fetchedData = await retrieveData();
      dispatch(initItems(fetchedData));
    } catch (e) {
      console.warn(e);
    }
  };
};

export const addPeriod = (period: Period) => {
  return async (dispatch: Dispatch) => {
    const retrieveData = async () => {
      const response = await axios.post(`http://localhost:3000/rooms`, {period});
      return await response.data;
    };

    try {
      const fetchedData = await retrieveData();
      dispatch(initItems(fetchedData));
    } catch (e) {
      console.warn(e);
    }
  };
};
