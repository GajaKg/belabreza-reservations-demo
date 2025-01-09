import { Card } from "primereact/card";
import { FC } from "react";
import TitleCard from "../../shared/TitleCard";
import HotelsForm from "./component/HotelsForm";

const Hotels: FC = () => {
  return (
    <Card>
      <TitleCard>Hoteli</TitleCard>
      <h4>Dodaj hotel</h4>
      <HotelsForm/>
    </Card>
  );
};

export default Hotels;
