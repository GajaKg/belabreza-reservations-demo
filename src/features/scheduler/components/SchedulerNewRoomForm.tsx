import { ChangeEvent, useEffect, useState, type FC } from "react";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Room } from "../Scheduler.interface";

interface Props {
  room?: Room;
  isEdit?: boolean;
  roomSubmited: (room: Room) => void;
  // roomSubmited: (room: Record<string, string | number>) => void;
}

const SchedulerNewRoomForm: FC<Props> = ({ room, isEdit=false, roomSubmited }: Props) => {
  const [edit, setEdit] = useState<boolean>(isEdit || false);
  const [name, setName] = useState<string>(room?.name || "");
  const [capacity, setCapacity] = useState<number>(room?.capacity || 0);

  useEffect(() => {
    setName(room?.name || "");
    setCapacity(room?.capacity || 0);
  }, [room]);

  const submitRoom = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !capacity) {
      alert("Popunite sva polja");
      return;
    }
    let roomSave: Room;
    if (edit) {
      roomSave = {
        id: room!.id,
        name,
        capacity,
        periods: [...room!.periods],
      };
    } else {
      roomSave = {
        id: Math.floor(Math.random() * 5000) + 23,
        name,
        capacity,
        periods: [],
      };
    }

    roomSubmited(roomSave)

    setEdit(false);
    setName("");
    setCapacity(0);
  };

  const onCancelHandler = () => {
    setName("");
    setCapacity(0);
    setEdit(false);
  };

  return (
    <>
      <form onSubmit={(e: ChangeEvent<HTMLFormElement>) => submitRoom(e)}>
        <div className="flex gap-2">
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Naziv sobe"
          />
          <InputNumber
            value={capacity}
            onChange={(e) => setCapacity(e.value || 0)}
            showButtons
            placeholder="Kapacitet"
          />
          <Button type="submit">Potvrdi</Button>
          <Button onClick={onCancelHandler} severity="success">
            Poništi
          </Button>
        </div>
      </form>
    </>
  );
};

export default SchedulerNewRoomForm;
