export interface Room {
  id: number | string;
  name: string;
  capacity: number;
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
