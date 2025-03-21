import type { FC } from "react";
import { Status } from "../../features/scheduler/Scheduler.interface";
import useIcon from "./useIcon";
import disabledIcon from "./../../assets/disabled.svg";

interface Props {
  status: Status;
}

const StartDayIcon: FC<Props> = ({ status = "confirmed" }: Props) => {
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
          data-testid="single.start"
        >
          <path
            d="M13.5 12.5L22.5858 3.41421C23.8457 2.15428 26 3.04662 26 4.82843V24C26 25.1046 25.1046 26 24 26H4.82843C3.04662 26 2.15428 23.8457 3.41421 22.5858L13.5 12.5Z"
            fill={colorIcon}
          ></path>
        </svg>
      )}
      {status === "disabled" && <img src={disabledIcon} />}
    </>
  );
};

export default StartDayIcon;
