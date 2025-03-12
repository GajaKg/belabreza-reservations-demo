/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

import { Period, Room } from "../Scheduler.interface";
import { useAppSelector } from "../../../store/hooks";
import SchedulerRoomsCell from "./SchedulerRoomsCell";


interface Props {
  daysFullDate: Date[];
  onRoomClicked: (room: Room) => void;
}

const SchedulerRooms: FC<Props> = ({ daysFullDate, onRoomClicked }: Props) => {
  const hotel = useAppSelector((state: any) => state.hotels.selectedItem);

  return (
    <>
      {hotel && hotel.rooms && hotel.rooms.map((room: Room, i: number) => (
        <tr key={i}>
          <td onClick={() => onRoomClicked(room)} className="rvg-title rvg-clickable rvg-fixed">{room.name}</td>
          <td className="rvg-info">{room.capacity}</td>

          {daysFullDate.map((day, i) => {
            const foundPeriods: Period[] | undefined = room.periods.filter(
              (period) =>
                day.getTime() >= new Date(period.start).getTime() &&
                day.getTime() <= new Date(period.end).getTime()
            );

            return (
              <SchedulerRoomsCell
                room={room}
                periods={foundPeriods}
                day={day}
                key={i}
              />
            );
          })}
        </tr>
      ))}
    </>
  );
};

export default SchedulerRooms;
