import { Card } from "primereact/card";
import { FC, useEffect, useState } from "react";
import TitleCard from "../../../shared/TitleCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Hotel } from "../Hotels.interface";
import { Accordion, AccordionTab } from "primereact/accordion";
import { DataTable, DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";
import HotelsForm from "../component/HotelsForm";
import { Button } from "primereact/button";
import { setEditItem } from "../store/hotelsSlice";
import { Outlet, useNavigate } from "react-router";
import { addHotel, deleteHotel } from "../store/hotels-actions";

const HotelsList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(state => state.hotels.items);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    return () => {
      dispatch(setEditItem(undefined))
    }
  }, [dispatch])


  const onSelectedHotelHandler = (hotel: Hotel) => {
    if (!hotel) return;
    setSelectedHotel(hotel)
    dispatch(setEditItem(hotel))
    navigate('/hotels/'+hotel.id);
  }

  const onSubmitHotelNew = (name: string, note: string) => {
    dispatch(addHotel({name, note} as Hotel))
  }
  const onDeleteHotel = (hotel: Hotel) => {
    dispatch(deleteHotel(hotel))
  }
  return (
    <>
      <Card>
        <TitleCard>Upravljaj hotelom</TitleCard>
        <HotelsForm submitHotel={(name: string, note: string) => onSubmitHotelNew(name, note)} />
        <Accordion activeIndex={0}>
          <AccordionTab header="Izaberi hotel">
            <DataTable value={hotels} tableStyle={{ minWidth: '50rem' }}
              editMode="row"
              selectionMode="single"
              selection={selectedHotel}
              onSelectionChange={(e: DataTableValue) => onSelectedHotelHandler(e.value)}>
              <Column field="id" header="id"></Column>
              <Column field="name" header="Naziv"></Column>
              <Column field="note" header="Info."></Column>
              <Column
                header="Akcije"
                body={(rowData) => (
                  <Button
                    label="Delete"
                    onClick={() => onDeleteHotel(rowData)}
                  />
                )}
              />
            </DataTable>
          </AccordionTab>
        </Accordion>
      </Card>
      <Outlet />
      {/* {editHotel && <HotelsListDetail hotel={editHotel} />} */}
    </>
  );
};

export default HotelsList;

