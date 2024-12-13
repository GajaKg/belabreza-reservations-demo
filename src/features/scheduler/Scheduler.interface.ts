export interface Room {
  id: number;
  name: string;
  capacity: string;
  periods: Period[];
}

export interface Period {
  id: number;
  start: Date;
  end: Date;
  status: "confirmed" | "awaiting" | "disabled";
}
