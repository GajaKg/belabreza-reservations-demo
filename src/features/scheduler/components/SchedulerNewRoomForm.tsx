import { ChangeEvent, useEffect, useState, type FC } from "react";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useAppDispatch } from "../../../store/hooks";
import { addRoom, editRoom } from "../store/scheduler-actions";
import { Room } from "../Scheduler.interface";

interface Props {
  room: Room | undefined;
}

const SchedulerNewRoomForm: FC<Props> = ({ room }: Props) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);

  useEffect(() => {
    setName(room?.name || "");
    setCapacity(room?.capacity || 0);
    setIsEdit(!!room);
  }, [room]);

  const submitRoom = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !capacity) {
      alert("Popunite sva polja");
      return;
    }

    if (isEdit) {
      const eRoom: Room = {
        id: room.id,
        name,
        capacity,
        periods: [...room.periods],
      };
      dispatch(editRoom(eRoom));
    } else {
      const newRoom: Room = {
        id: Math.floor(Math.random() * 500) + 23,
        name,
        capacity,
        periods: [],
      };
      dispatch(addRoom(newRoom));
    }

    setName("");
    setCapacity(0);
  };

  const onCancelHandler = () => {
    setIsEdit(false);
    setName("");
    setCapacity(0);
  };

  return (
    <>
      <form onSubmit={(e: ChangeEvent<HTMLFormElement>) => submitRoom(e)}>
        <p>{isEdit ? "Izmeni sobu" : "Dodaj sobu"}</p>
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
