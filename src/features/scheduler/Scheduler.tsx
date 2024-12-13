/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useContext, useState } from "react";

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

const date = new Date();
const fd = new Date(date.getFullYear(), date.getMonth(), 1);
const ld = new Date(date.getFullYear(), date.getMonth() + 1, 0);
const daysFullDateInit = [new Date(fd)];
const initDaysNames = [days[fd.getDay()]];

for (let d = 1; d < ld.getDate(); d++) {
  fd.setDate(fd.getDate() + 1);
  const dayName = days[fd.getDay()];
  initDaysNames.push(dayName);
  daysFullDateInit.push(new Date(fd));
}

const Scheduler: FC = () => {
  const rooms = useAppSelector((state: any) => state.scheduler.rooms);
  const dispatch = useAppDispatch();
  console.log(rooms);
  const schedulerCtx = useContext(SchedulerContext);

  const [lastDayFullDate, setLastDayFullDate] = useState(ld); // last day full date
  const lastDay = lastDayFullDate.getDate();

  const [daysFullDate, setDaysFullDate] = useState<Date[]>(daysFullDateInit);
  const [daysNames, setDaysNames] = useState<string[]>(initDaysNames);

  const [selectedDate, setSelectedDate] = useState(date);

  const onChangeDateHandler = (e: any) => {
    const newDate = new Date(e.value);
    const fd = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    const ld = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);

    setDaysNames(() => [days[fd.getDay()]]); // add first day in month
    setDaysFullDate(() => []);
    // adds rest of a days
    for (let d = 1; d < ld.getDate(); d++) {
      const d = newDate.setDate(newDate.getDate() + 1);
      const dayName = days[newDate.getDay()];
      setDaysNames((oldArray) => [...oldArray, dayName]);
      setDaysFullDate((oldArray) => [...oldArray, new Date(d)]);
    }
    setLastDayFullDate(ld);
    setSelectedDate(e.value);
  };

  const onClickCellHandler = (room: Room, period: Period[] | undefined) => {
    console.log(room, period);
  };
  const add = () => {
    // dispatch(addPeriod(  {
    //   id: 1,
    //   name: "Soba #1",
    //   capacity: "4",
    //   periods: [
    //     {
    //       id: 1,
    //       start: new Date("12-04-2024").toDateString(),
    //       end: new Date("12-09-2024").toDateString(),
    //       status: "confirmed",
    //     },
    //     {
    //       id: 2,
    //       start: new Date("12-11-2024").toDateString(),
    //       end: new Date("12-13-2024").toDateString(),
    //       status: "confirmed",
    //     },
    //     {
    //       id: 3,
    //       start: new Date("12-22-2024").toDateString(),
    //       end: new Date("12-30-2024").toDateString(),
    //       status: "awaiting",
    //     },
    //   ],
    // },))
    schedulerCtx.addPeriod();
  };

  return (
    <>
      <button onClick={add}>ADD</button>
      <Calendar
        value={selectedDate}
        onChange={onChangeDateHandler}
        view="month"
        dateFormat="mm/yy"
      />

      <div className={s.rvgWrapper} data-testid="grid-wrapper">
        <table className="rvg-table">
          <thead>
            <tr>
              <td rowSpan="2" className={[s.rvgTitle, s.rvgFixed].join(" ")}>
                Soba
              </td>
              <td rowSpan="2" className="rvg-info">
                Kapacitet
              </td>
              {daysNames.map((day, i) => (
                <td className="rvg-cell" key={i}>
                  {day}
                </td>
              ))}
            </tr>
            <tr data-testid="row-dates">
              {Array.from({ length: lastDay }, (_, i) => (
                <td className="rvg-cell" key={i}>
                  {i + 1}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedulerCtx.rooms.map((room: Room, i) => (
              <tr key={i}>
                <td className="rvg-title rvg-clickable rvg-fixed">
                  {room.name}
                </td>
                <td className="rvg-info">{room.capacity}</td>

                {daysFullDate.map((day, i) => {
                  const foundPeriods: Period[] | undefined =
                    room.periods.filter(
                      (period) =>
                        day.getTime() >= period.start.getTime() &&
                        day.getTime() <= period.end.getTime()
                    );

                  let intersect = false;
                  let firstDay,
                    lastDay = false;

                  if (foundPeriods.length >= 2) {
                    intersect =
                      foundPeriods[1]?.start.getTime() ==
                        foundPeriods[0]?.end.getTime() ||
                      foundPeriods[1]?.end.getTime() ==
                        foundPeriods[0]?.start.getTime();
                  } else {
                    firstDay =
                      day.getTime() == foundPeriods[0]?.start.getTime();
                    lastDay = day.getTime() == foundPeriods[0]?.end.getTime();
                  }
                  const dayDisplayed = (
                    <div className="day">
                      {firstDay && !intersect && (
                        <img src={startDayConfirmed} />
                      )}
                      {!firstDay && !lastDay && !intersect && (
                        <img src={dayConfirmed} />
                      )}
                      {lastDay && !intersect && <img src={endDayConfirmed} />}
                      {intersect && <img src={intersectConfirmed} />}
                    </div>
                  );
                  const displayValue = foundPeriods.length
                    ? dayDisplayed
                    : null;

                  return (
                    <td
                      className="rvg-cell"
                      key={i}
                      onClick={() => onClickCellHandler(room, foundPeriods)}
                    >
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Scheduler;
