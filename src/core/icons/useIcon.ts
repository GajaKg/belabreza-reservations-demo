import { Status } from "../../features/scheduler/Scheduler.interface";

export function useIcon(status: Status) {
  const colorsStatus = {
    confirmed: "#006490",
    awaiting: "#ddebf3",
    disabled: "",
  };
  const colorIcon = colorsStatus[status];

  return colorIcon;
}

export default useIcon;
