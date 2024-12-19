import axios from 'axios';
import { AppDispatch } from '../../../store/store';
import { initItems } from "./schedulerSlice";
import { Period } from "../Scheduler.interface";

export const fetchData = () => {
  return async (AppDispatch: AppDispatch) => {
    const retrieveData = async () => {
      const response = await axios.get(`http://localhost:3000/rooms`);
      return await response.data;
    };

    try {
      const fetchedData = await retrieveData();
      AppDispatch(initItems(fetchedData));
    } catch (e) {
      console.warn(e);
    }
  };
};

export const addPeriod = (period: Period) => {
  return async (AppDispatch: AppDispatch) => {
    const retrieveData = async () => {
      const response = await axios.post(`http://localhost:3000/rooms`, {period});
      return await response.data;
    };

    try {
      const fetchedData = await retrieveData();
      AppDispatch(initItems(fetchedData));
    } catch (e) {
      console.warn(e);
    }
  };
};
