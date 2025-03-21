/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";

import { Period, Room } from "../Scheduler.interface";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { FormEvent } from "primereact/ts-helpers";
import { editHotel } from "../../hotels/store/hotels-actions";
import { setSelectedItems } from "../../hotels/store/hotelsSlice";

interface Props {
  room: Room;
  per: Period[];
  day: Date;
  closeForm: () => void;
}
const roomStatus = [
  { name: "Potvrdjeno", code: "confirmed" },
  { name: "U čekanju", code: "awaiting" },
  { name: "Nedostupno", code: "disabled" },
];
const dropdownCodes: Record<string, object> = {
  confirmed: { name: "Potvrdjeno", code: "confirmed" },
  awaiting: { name: "U čekanju", code: "awaiting" },
  disabled: { name: "Nedostupno", code: "disabled" },
};

const SchedulerRoomsForm: FC<Props> = ({
  room,
  per,
  day,
  closeForm,
}: Props) => {
  const dispatch = useAppDispatch();
  const activeHotel = useAppSelector(state => state.hotels.selectedItem);
  const isEdit = !!per.length;
  const periods = [...per]; // copy of periods
  const defaultDates: any = [];
  const defaultNotes: any = [];
  const defaultStatus: any = [];
  const defaultPaid: boolean[] = [];
  // const [checked, setChecked] = useState(true);
  if (!periods.length) {
    periods.push({
      id: Math.floor(Math.random() * 500) + 23,
      // id: newId,
      start: day,
      end: day,
      status: "confirmed",
      note: "",
      paid: false,
    });
  }

  periods.forEach((period: Period) => {
    defaultDates.push({ start: period.start, end: period.end });
    defaultNotes.push(period.note);
    defaultPaid.push(period.paid);
    // defaultStatus.push(period.status);
    defaultStatus.push(dropdownCodes[period.status]);
  });

  const [dates, setDates] = useState<any[]>(defaultDates);
  const [notes, setNotes] = useState<any>(defaultNotes);
  const [paid, setPaid] = useState<any>(defaultPaid);
  const [selectedRoomStatus, setSelectedRoomStatus] = useState(defaultStatus);

  const submitReserevation = (
    e: ChangeEvent<HTMLFormElement>,
    index: number
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const status = selectedRoomStatus[index]?.code;

    // format dates ****************
    const formDataStart = formData.get("dateStart" + index)!.toString();
    const formDataEnd = formData.get("dateEnd" + index)!.toString();
    const [dayStart, monthStart, yearStart] = formDataStart.split("/");
    const [dayEnd, monthEnd, yearEnd] = formDataEnd.split("/");
    // format dates ****************

    if (!formDataStart || !formDataEnd || !status) {
      alert("Neispravni podaci!");
      return;
    }

    const periodId: number | undefined = +periods[index].id || Math.floor(Math.random() * 500) + 23;
    const dateStart = new Date(`${yearStart}-${monthStart}-${dayStart}`);
    const dateEnd = new Date(`${yearEnd}-${monthEnd}-${dayEnd}`);
    const note = formData.get("note" + index)
      ? formData.get("note" + index)!.toString()
      : "";
    const paid = formData.get("paid" + index)
      ? !!formData.get("paid" + index)
      : false;

    const up: Period = {
      id: periodId,
      start: dateStart.toDateString(),
      end: dateEnd.toDateString(),
      note: note,
      status: status,
      paid: paid,
    };

    const copyRoom = {
      ...room,
      periods: [...room.periods],
    };

    if (isEdit) {
      const updatedPeriods: Period[] = room.periods.map((period: Period) => {
        if (period.id === up.id) {
          return up;
        }
        return period;
      });
      copyRoom.periods = updatedPeriods;

      if (activeHotel) {
        const hotel = {
          ...activeHotel,
          rooms: activeHotel.rooms.map((room: Room) => {
            if (+room.id === +copyRoom.id) {
              return copyRoom;
            }
            return room
          })
        };

        dispatch(editHotel(hotel));
        dispatch(setSelectedItems(hotel))
      }
    } else {
      copyRoom.periods.push(up);
      // dispatch(addPeriod(copyRoom));
      if (activeHotel) {
        const hotel = {
          ...activeHotel,
          rooms: activeHotel.rooms.map((room: Room) => {
            if (+room.id === +copyRoom.id) {
              return copyRoom;
            }
            return room
          })
        };

        dispatch(editHotel(hotel));
        dispatch(setSelectedItems(hotel))
      }
    }

    closeForm(); // event emitter
  };

  const dateStartHandler = (
    e: FormEvent<Date, SyntheticEvent<Element, Event>>,
    index: number
  ) => {
    setDates((oldVal: any) => {
      const updateDateStart = [...oldVal];
      updateDateStart[index].start = e.target.value;
      return updateDateStart;
    });
  };

  const dateEndHandler = (
    e: FormEvent<Date, SyntheticEvent<Element, Event>>,
    index: number
  ) => {
    setDates((oldVal: any) => {
      const updateDateEnd = [...oldVal];
      updateDateEnd[index].end = e.target.value;
      return updateDateEnd;
    });
  };

  const roomStatusHandler = (
    e: FormEvent<Date, SyntheticEvent<Element, Event>>,
    index: number
  ) => {
    setSelectedRoomStatus((oldVal: any) => {
      const updateStatus = [...oldVal];
      updateStatus[index] = e.target.value;
      return updateStatus;
    });
  };

  const noteHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setNotes((oldVal: any) => {
      const updatedNotes = [...oldVal];
      updatedNotes[index] = e.target.value;
      return updatedNotes;
    });
  };
  const paidHandler = (e: InputSwitchChangeEvent, index: number) => {
    setPaid((oldVal: any) => {
      const updatedPaid = [...oldVal];
      updatedPaid[index] = e.target.value;
      return updatedPaid;
    });
  };

  return (
    <>
      <div>
        {periods.map((_period: Period, i: number) => {
          return (
            <form
              onSubmit={(e: ChangeEvent<HTMLFormElement>) =>
                submitReserevation(e, i)
              }
              className={`${i == 0 ? "mb-10" : ""} other-class`}
              key={i}
            >
              <div className="flex gap-5 mb-5">
                <Calendar
                  id={"dateStart" + i}
                  name={"dateStart" + i}
                  value={new Date(dates[i].start)}
                  onChange={(e) => dateStartHandler(e, i)}
                  dateFormat="dd/mm/yy"
                  className="w-1/2"
                />

                <Calendar
                  id={"dateEnd" + i}
                  name={"dateEnd" + i}
                  value={new Date(dates[i].end)}
                  onChange={(e) => dateEndHandler(e, i)}
                  dateFormat="dd/mm/yy"
                  className="w-1/2"
                />
              </div>
              <div className="flex gap-5 mb-5">
                <Dropdown
                  id={"status" + i}
                  name={"status" + i}
                  value={selectedRoomStatus[i]}
                  onChange={(e) => roomStatusHandler(e, i)}
                  options={roomStatus}
                  optionLabel="name"
                  placeholder="Status sobe"
                  className="w-1/2 md:w-14rem"
                />
                <InputText
                  id={"note" + i}
                  name={"note" + i}
                  value={notes[i]}
                  onChange={(e) => noteHandler(e, i)}
                  placeholder="Info."
                  className="w-1/2"
                />
              </div>
              <div className="flex gap-5 mb-5">
                {/* <Dropdown
                  id={"status" + i}
                  name={"status" + i}
                  value={selectedRoomStatus[i]}
                  onChange={(e) => roomStatusHandler(e, i)}
                  options={roomStatus}
                  optionLabel="name"
                  placeholder="Status sobe"
                  className="w-1/2 md:w-14rem"
                /> */}
                <div>
                  <InputSwitch
                    id={"paid" + i}
                    name={"paid" + i}
                    checked={paid[i]}
                    onChange={(e) => paidHandler(e, i)}
                    aria-label="Plaćeno" /> Plaćeno
                </div>
              </div>
              <Button type="submit">Sačuvaj </Button>
            </form>
          );
        })}
      </div>
    </>
  );
};

export default SchedulerRoomsForm;
