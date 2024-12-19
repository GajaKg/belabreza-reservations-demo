/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import s from "./Scheduler.module.css";
import { Calendar } from "primereact/calendar";
import { days } from "../../mocks";
import SchedulerRooms from "./SchedulerRooms";

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
    setDaysFullDate(() => [fd]); // add first day in month
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

  return (
    <>
      {/* <button onClick={add}>ADD</button> */}
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
              <td rowSpan={2} className={[s.rvgTitle, s.rvgFixed].join(" ")}>
                Soba
              </td>
              <td rowSpan={2} className="rvg-info">
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
            <SchedulerRooms daysFullDate={daysFullDate} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Scheduler;
