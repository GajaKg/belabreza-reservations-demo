import { FC } from "react";

interface Props {
  children: string;
}

const TitleCard: FC<Props> = ({ children }: Props) => {
  return <h2 className="text-4xl mt-0">{children}</h2>;
};

export default TitleCard;
