/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import TitleCard from "../../../shared/TitleCard";
import { selectCustomers } from "../store/customersSlice";
import { useAppSelector } from "../../../store/hooks";
import { Customer } from "../models/Customer.interface";


// interface Props {
//   daysFullDate: Date[];
//   onRoomClicked: (room: Room) => void;
// }

// const SchedulerRooms: FC<Props> = ({ daysFullDate, onRoomClicked }: Props) => {
const Customers: FC = () => {
    const customers: Customer[] = useAppSelector(selectCustomers);
    const onRowEditComplete = async (e: any) => {
        const editRoom = e.newData;
        console.log(editRoom)
    };

    const textEditor = (options: ColumnEditorOptions) => {
        if (options && options.editorCallback) {
            return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback!(e.target.value)} />;
        }
    };
    const onDeleteCustomer = (rowData: any) => {
        console.log(rowData)
    }

    return (
        <Card>
            <TitleCard>Korisnici</TitleCard>
            <DataTable value={customers}
                tableStyle={{ minWidth: '50rem' }}
                onRowEditComplete={onRowEditComplete}
                editMode="row"
            >
                <Column field="id" header="#"></Column>
                <Column field="name" header="Ime" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column field="phone" header="Telefon" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column field="email" header="Email" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                <Column rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column
                    header="Akcije"
                    body={(rowData) => (
                        <Button
                            label="Delete"
                            onClick={() => onDeleteCustomer(rowData)}
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default Customers;
