export interface Room {
  id: number;
  name: string;
  capacity: string;
  periods: Period[];
}

export type Status = "confirmed" | "awaiting" | "disabled";

export interface Period {
  id: number | string;
  start: Date | string;
  end: Date | string;
  status: "confirmed" | "awaiting" | "disabled";
  note: string;
}
