import axios from "axios";
import { AppDispatch } from "../../../store/store";
import { initItems } from "./schedulerSlice";
import { Room } from "../Scheduler.interface";

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

export const editPeriod = (room: Room) => {
  return async (AppDispatch: AppDispatch) => {
    const retrieveData = async () => {
      const response = await axios.put(
        `http://localhost:3000/rooms/${room.id}`,
        room
      );
      await response.data.room;
    };

    try {
      await retrieveData();
      await AppDispatch(fetchData());
      alert("Uspešno izmenjen period");
    } catch (e) {
      alert("Neuspešno");
      console.warn(e);
    }
  };
};

export const addPeriod = (room: Room) => {
  return async (AppDispatch: AppDispatch) => {
    const retrieveData = async () => {
      const response = await axios.put(
        `http://localhost:3000/rooms/${room.id}`,
        room
      );
      await response.data.room;
    };

    try {
      await retrieveData();
      await AppDispatch(fetchData());
      alert("Uspešno dodat period");
    } catch (e) {
      alert("Neuspešno");
      console.warn(e);
    }
  };
};

export const addRoom = (room: Room) => {
  return async (AppDispatch: AppDispatch) => {
    const retrieveData = async () => {
      const response = await axios.post(
        `http://localhost:3000/rooms`,
        room
      );
      await response.data.room;
    };

    try {
      await retrieveData();
      await AppDispatch(fetchData());
      alert("Uspešno dodata soba");
    } catch (e) {
      alert("Neuspešno");
      console.warn(e);
    }
  };
};

export const editRoom = (room: Room) => {
  return async (AppDispatch: AppDispatch) => {
    const retrieveData = async () => {
      const response = await axios.put(
        `http://localhost:3000/rooms/${room.id}`,
        room
      );
      await response.data.room;
    };

    try {
      await retrieveData();
      await AppDispatch(fetchData());
      alert("Uspešno dodata soba");
    } catch (e) {
      alert("Neuspešno");
      console.warn(e);
    }
  };
};
