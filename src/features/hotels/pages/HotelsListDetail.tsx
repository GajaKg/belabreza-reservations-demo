import { Card } from "primereact/card";
import { FC, useEffect, useState } from "react";
import TitleCard from "../../../shared/TitleCard";
import { Hotel } from "../Hotels.interface";
import HotelsForm from "../component/HotelsForm";
import { useAppDispatch } from "../../../store/hooks";
import SchedulerNewRoomForm from "../../scheduler/components/SchedulerNewRoomForm";
import { editHotel } from "../store/hotels-actions";
import { Room } from "../../scheduler/Scheduler.interface";
import { DataTable } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import axios from "axios";

// interface Props {
//   // hotel?: Hotel | null;
// }

// const HotelsListDetail: FC<Props> = ({ hotel }: Props) => {
const HotelsListDetail: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);



  // Fetch the hotel when the component mounts or when the id changes
  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;

      const getSetHotel = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/hotels/${id}`);
          const fetchedHotel = response.data;
          console.log("fetchHotel", fetchedHotel);
          if (fetchedHotel) {
            setHotel(fetchedHotel);
          }
        } catch (error) {
          console.error("Error fetching hotel:", error);
        }
      }

      getSetHotel()
    };

    fetchHotel();
  }, [id]);

  const onSubmitHotelEdit = async (name: string, note: string) => {
    if (!id) return;
    const hotelCopy: Hotel = {
      id: id,
      name: name,
      note: note,
      rooms: hotel?.rooms ?? []
    }
    dispatch(editHotel(hotelCopy))
    setHotel(hotelCopy)
  }

  const onRoomSubmitHandler = async (e: Room) => {
    console.log(hotel, e)
    if (hotel) {
      const hotelCopy: Hotel = {
        ...hotel,
        rooms: [...hotel.rooms, e]
      }

      dispatch(editHotel(hotelCopy))
      setHotel(hotelCopy)
    }
  }

  const textEditor = (options: ColumnEditorOptions) => {
    if (options && options.editorCallback) {
      return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback!(e.target.value)} />;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRowEditComplete = async (e: any) => {
    const editRoom = e.newData;
    if (hotel) {
      const hotelCopy = { ...hotel }
      hotelCopy.rooms = hotel!.rooms.map((room: Room) => {
        if (+room.id === +editRoom.id) {
          return {
            ...room,
            ...editRoom
          };
        } else {
          return room;
        }
      });
      console.log(hotelCopy)
      await dispatch(editHotel(hotelCopy))
      setHotel(hotelCopy)
    }
  };

  const onDeleteRoom = (room: Room) => {
    console.log(room)
  }



  return (
    <Card>
      <TitleCard>{hotel?.name || ""}</TitleCard>
      {hotel && hotel.name && hotel.note &&
        <>
          <p>Izmeni</p>
          <HotelsForm
            name={hotel.name}
            note={hotel.note}
            submitHotel={
              (name: string, note: string) => onSubmitHotelEdit(name, note)
            }
          />
        </>}
      <p className="mt-8">Dodaj sobu</p>
      <SchedulerNewRoomForm roomSubmited={(e) => onRoomSubmitHandler(e)} />
      {/* <ul>
        {hotel && hotel.rooms && hotel.rooms.map((room: Room) => ( 
          <li key={room.id+"rooms"}>{room.name} {room.capacity}</li>
        ))}
      </ul> */}
      <p className="mt-10">Lista soba</p>
      {hotel && hotel.rooms &&
        <DataTable value={hotel.rooms}
          tableStyle={{ minWidth: '50rem' }}
          onRowEditComplete={onRowEditComplete}
          editMode="row"
        >
          <Column field="id" header="#"></Column>
          <Column field="capacity" header="capacity" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column field="name" header="Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
          <Column rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
          <Column
            header="Akcije"
            body={(rowData) => (
              <Button
                label="Delete"
                onClick={() => onDeleteRoom(rowData)}
              />
            )}
          />
        </DataTable>}
    </Card>
  );
};

export default HotelsListDetail;

