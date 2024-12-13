/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

import s from "./Scheduler.module.css";

import { Calendar } from "primereact/calendar";
import endDayConfirmed from "../../../src/assets/endDayConfirmed.svg";
import startDayConfirmed from "../../../src/assets/startDayConfirmed.svg";
import dayConfirmed from "../../../src/assets/dayConfirmed.svg";
import intersectConfirmed from "../../../src/assets/intersectConfirmed.svg";

import { days } from "../../mocks";
import { Period, Room } from "./Scheduler.interface";
import { SchedulerContext } from "./store/Scheduler.context";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addPeriod } from "./store/schedulerSlice";



const SchedulerRooms: FC = () => {
  
  return (
    <>

    </>
  );
};

export default SchedulerRooms;
