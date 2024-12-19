import type { FC } from "react";
import useIcon from "./useIcon";
import { Status } from "../../features/scheduler/Scheduler.interface";
import disabledIcon from "./../../assets/disabled.svg";

interface Props {
  status: Status;
}

const DayIcon: FC<Props> = ({ status = "confirmed" }: Props) => {
  const colorIcon = useIcon(status);

  return (
    <>
      {status !== "disabled" && (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="26" height="26" rx="2" fill={colorIcon}></rect>
        </svg>
      )}
      {status === "disabled" && <img src={disabledIcon}/>}
    </>
  );
};

export default DayIcon;
