import { Room } from "../scheduler/Scheduler.interface";

export interface Hotel {
  id: number | string;
  name: string;
  note: string;
  rooms: Room[];
}

