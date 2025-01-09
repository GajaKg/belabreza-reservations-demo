import { ChangeEvent, useState, type FC } from "react";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useAppDispatch } from "../../../store/hooks";

const HotelsForm: FC = () => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const submitHotel = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !note) {
      alert("Popunite sva polja");
      return;
    }

    if (isEdit) {

    } else {

    }


  };

  const onCancelHandler = () => {
    setIsEdit(false);
    setName("");
    setNote("");
  };

  return (
    <>
      <form onSubmit={(e: ChangeEvent<HTMLFormElement>) => submitHotel(e)}>
        <div className="flex gap-2">
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Naziv sobe"
          />
          <InputText
            value={name}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Naziv sobe"
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

export default HotelsForm;
