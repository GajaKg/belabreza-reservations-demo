import { AppDispatch } from "../../../store/store";
import { initItems } from "./hotelsSlice";
import { Hotel } from "../Hotels.interface";
import { hotelService } from "../services/Hotel.service";

export const fetchData = () => {
  return async (AppDispatch: AppDispatch) => {
    try {
      const fetchedData = await hotelService.fetchHotels();
      console.log("fetchData ----->", fetchedData)
      console.table(fetchedData)
      AppDispatch(initItems(fetchedData ?? []));
    } catch (e) {
      console.warn(e);
    }
  };
};

export const addHotel = (hotel: Hotel) => {
  return async (AppDispatch: AppDispatch) => {
    try {
      // await retrieveData();
      hotelService.addHotel(hotel);
      await AppDispatch(fetchData());
      // alert("Uspešno dodat hotel");
    } catch (e) {
      alert("Neuspešno");
      console.warn(e);
    }
  };
};

export const editHotel = (hotel: Hotel) => {
  return async (AppDispatch: AppDispatch) => {
    try {
      // await retrieveData();
      await hotelService.editHotel(hotel);
      await AppDispatch(fetchData());
      // alert("Uspešno izmenjeni podaci o hotelu");
    } catch (e) {
      // console.warn(e)
      console.warn(e);
    }
  };
};