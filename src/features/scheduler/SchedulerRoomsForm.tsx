/* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import { ChangeEvent, FC, useState } from "react";
import { Period, Room, Status } from "./Scheduler.interface";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addPeriod } from "./store/schedulerSlice";

interface Props {
  room: Room;
  periods: Period[];
}
const roomStatus = [
  { name: "Potvrdjeno", code: "confirmed" },
  { name: "U čekanju", code: "awaiting" },
  { name: "Nedostupno", code: "disabled" },
];
const dropdownCodes: any = {
  confirmed: { name: "Potvrdjeno", code: "confirmed" },
  awaiting: { name: "U čekanju", code: "awaiting" },
  disabled: { name: "Nedostupno", code: "disabled" },
};

const SchedulerRoomsForm: FC<Props> = ({ room, periods }: Props) => {
  console.log(room, periods);

  const defaultDates: any = [];
  const defaultNotes: any = [];
  const defaultStatus: any = [];
  periods.forEach((period: Period) => {
    defaultDates.push({ start: period.start, end: period.end });
    defaultNotes.push(period.note);
    defaultStatus.push(period.status);
  });

  const [dates, setDates] = useState<any>(defaultDates);
  const [notes, setNotes] = useState<any>(defaultNotes);
  const [selectedRoomStatus, setSelectedRoomStatus] = useState(defaultStatus);

  const submitReserevation = (e: ChangeEvent<HTMLFormElement>, index: number) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log(formData, formData.get("note"+index), index);
    // const startDate = target.startDate.value; // typechecks!
    // const endDate = target.endDate.value; // typechecks!
    // console.log(startDate, endDate);
    // const content = formData.get("startDate");
    // const button = formData.get("endDate");
  };

  return (
    <>
      <div>
        {periods.map((period: Period, i: number) => {
          return (
            <form
              onSubmit={(e: ChangeEvent<HTMLFormElement>) => submitReserevation(e, i)}
              className={`${i == 0 ? "mb-10" : ""} other-class`}
              key={i}
            >
              <div className="flex gap-5 mb-5">
                <Calendar
                  id={"dateStart" + i}
                  name={"dateStart" + i}
                  value={new Date(dates[i].start)}
                  dateFormat="dd/mm/yy"
                  className="w-1/2"
                />

                <Calendar
                  id={"dateEnd" + i}
                  name={"dateEnd" + i}
                  value={new Date(dates[i].end)}
                  dateFormat="dd/mm/yy"
                  className="w-1/2"
                />
              </div>
              <div className="flex gap-5 mb-5">
                <Dropdown
                  id={"status" + i}
                  name={"status" + i}
                  value={dropdownCodes[selectedRoomStatus[i]]}
                  onChange={(e) => setSelectedRoomStatus(e.value)}
                  options={roomStatus}
                  optionLabel="name"
                  placeholder="Status sobe"
                  className="w-1/2 md:w-14rem"
                />
                <InputText
                  id={"note" + i}
                  name={"note" + i}
                  value={notes[i]}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Info."
                  className="w-1/2"
                />
              </div>
              <button type="submit">Sačuvaj </button>
            </form>
          );
        })}
      </div>
    </>
  );
};

export default SchedulerRoomsForm;
