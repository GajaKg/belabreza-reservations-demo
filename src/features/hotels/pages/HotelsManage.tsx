import { Card } from "primereact/card";
import { FC, useState } from "react";

import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable, DataTableValue } from 'primereact/datatable';
import { Column } from 'primereact/column';

import TitleCard from "../../../shared/TitleCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Scheduler from "../../scheduler/Scheduler";
import { Hotel } from "../Hotels.interface";
import { setSelectedItems } from "../store/hotelsSlice";

const Hotels: FC = () => {
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(state => state.hotels.items);

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const onSelectedHotelHandler = (hotel: Hotel) => {
    if (!hotel) return;
    setSelectedHotel(hotel)
    dispatch(setSelectedItems(hotel))
  }

  return (
    <Card>
      <TitleCard>Hoteli</TitleCard>
      <Accordion activeIndex={0}>
        <AccordionTab header="Izaberi hotel">
          <DataTable value={hotels} tableStyle={{ minWidth: '50rem' }}
            selectionMode="single"
            selection={selectedHotel}
            onSelectionChange={(e: DataTableValue) => onSelectedHotelHandler(e.value)}>
            <Column field="id" header="id"></Column>
            <Column field="name" header="Naziv"></Column>
            <Column field="note" header="Info!."></Column>
          </DataTable>
        </AccordionTab>
      </Accordion>
      {/* <h4>Dodaj hotel</h4>
      <HotelsForm/> */}
      {selectedHotel && <Scheduler></Scheduler>}
    </Card>
  );
};

export default Hotels;
