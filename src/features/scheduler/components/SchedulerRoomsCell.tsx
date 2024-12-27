import { Dialog } from "primereact/dialog";
import { FC, useState } from "react";
import { Period, Room } from "../Scheduler.interface";

import DayIcon from "../../../core/icons/DayIcon";
import StartDayIcon from "../../../core/icons/StartDayIcon";
import EndDayIcon from "../../../core/icons/EndDayIcon";
import IntersectDayIcon from "../../../core/icons/IntersectDayIcon";
import SchedulerRoomsForm from "./SchedulerRoomsForm";

interface Props {
  room: Room;
  periods: Period[];
  day: Date;
}

const SchedulerRoomsCell: FC<Props> = ({ room, periods, day }: Props) => {
  const [visible, setVisible] = useState(false);

  // const add = () => {
  //   // dispatch(addPeriod(  {
  //   //   id: 1,
  //   //   name: "Soba #1",
  //   //   capacity: "4",
  //   //   periods: [
  //   //     {
  //   //       id: 1,
  //   //       start: new Date("12-04-2024").toDateString(),
  //   //       end: new Date("12-09-2024").toDateString(),
  //   //       status: "confirmed",
  //   //     },
  //   //     {
  //   //       id: 2,
  //   //       start: new Date("12-11-2024").toDateString(),
  //   //       end: new Date("12-13-2024").toDateString(),
  //   //       status: "confirmed",
  //   //     },
  //   //     {
  //   //       id: 3,
  //   //       start: new Date("12-22-2024").toDateString(),
  //   //       end: new Date("12-30-2024").toDateString(),
  //   //       status: "awaiting",
  //   //     },
  //   //   ],
  //   // },))
  //   schedulerCtx.addPeriod();
  // };

  let intersect,
    firstDay,
    lastDay = false;

  if (periods.length >= 2) {
    intersect =
      new Date(periods[1]?.start).getTime() ==
        new Date(periods[0]?.end).getTime() ||
      new Date(periods[1]?.end).getTime() ==
        new Date(periods[0]?.start).getTime();
  } else {
    firstDay = new Date(day).getTime() == new Date(periods[0]?.start).getTime();
    lastDay = new Date(day).getTime() == new Date(periods[0]?.end).getTime();
  }

  const dayDisplayed = (
    <div className="day">
      {firstDay && !intersect && <StartDayIcon status={periods[0]?.status} />}
      {!firstDay && !lastDay && !intersect && (
        <DayIcon status={periods[0]?.status} />
      )}
      {lastDay && !intersect && <EndDayIcon status={periods[0]?.status} />}
      {intersect && <IntersectDayIcon periods={periods} />}
    </div>
  );
  const displayValue = periods.length ? dayDisplayed : null;

  const onClickCellHandler = () => {
    setVisible(true);
    // useAppDispatch(addPeriod())
  };

  return (
    <>
      <td
        className="rvg-cell"
        onClick={onClickCellHandler}
      >
        {displayValue}
      </td>
      <Dialog
        header={room.name}
        visible={visible}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="m-0">
          <SchedulerRoomsForm
            room={room}
            periods={periods}
            closeForm={() => {
              if (!visible) return;
              setVisible(false);
            }}
          />
        </div>
      </Dialog>
    </>
  );
};

export default SchedulerRoomsCell;
