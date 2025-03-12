import { ChangeEvent, useEffect, useState, type FC } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface Props {
  name?: string;
  note?: string;
  submitHotel: (name: string, note: string) => void;
}

const HotelsForm: FC<Props> = (props: Props) => {
  const [name, setName] = useState<string>(props.name || "");
  const [note, setNote] = useState<string>(props.note || "");

  useEffect(() => {
    setName(props.name || "")
    setNote(props.note || "")
  }, [props.name, props.note])

  const emitSubmitHotel = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !note) {
      alert("Popunite sva polja");
      return;
    }

    props.submitHotel(name, note);

    // if (isEdit) {

    // } else {

    // }


  };

  const onCancelHandler = () => {
    setName("");
    setNote("");
  };

  return (
    <form onSubmit={(e: ChangeEvent<HTMLFormElement>) => emitSubmitHotel(e)}>     
      <div className="flex gap-2">
        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Naziv Hotela"
        />
        <InputText
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="info"
        />
        <Button type="submit">Potvrdi</Button>
        <Button onClick={onCancelHandler} severity="success">
          Poništi
        </Button>
      </div>
    </form>
  );
};

export default HotelsForm;
