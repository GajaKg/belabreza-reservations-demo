import { AppDispatch } from "../../../store/store";
import { initCustomers } from "./customersSlice";
import { customerService } from "../services/Customer.service";
import { Customer } from "../models/Customer.interface";

export const fetchCustomers = () => {
  return async (AppDispatch: AppDispatch) => {

    try {
      const fetchedData = await customerService.fetchCustomers();
      AppDispatch(initCustomers(fetchedData ?? []));
    } catch (e) {
      console.warn(e);
    }
  };
};

export const addCustomer = (customer: Customer) => {
  return async (AppDispatch: AppDispatch) => {
    try {
      const response = await customerService.addCustomer(customer);
      if (response) {
        await AppDispatch(fetchCustomers());
      }
    } catch (e) {
      console.warn(e);
    }
  };
};

export const editHotel = (customer: Customer) => {
  return async (AppDispatch: AppDispatch) => {
    try {
      // await retrieveData();
      await customerService.editCustomer(customer);
      await AppDispatch(fetchCustomers());
      // alert("Uspešno izmenjeni podaci o hotelu");
    } catch (e) {
      // console.warn(e)
      console.warn(e);
    }
  };
};

export const deleteHotel = (customer: Customer) => {
  return async (AppDispatch: AppDispatch) => {
    try {
      const response = await customerService.deleteCustomer(customer);
      if (response) {
        await AppDispatch(fetchCustomers());
      }
    } catch (e) {
      console.warn(e);
    }
  };
};