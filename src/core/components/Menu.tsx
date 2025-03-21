import type { FC } from "react";

import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router";

const Menu: FC = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Planer",
      icon: "pi pi-calendar",
      command: () => {
        navigate('');
    }
    },
    {
      label: "Hoteli",
      icon: "pi pi-home",
      command: () => {
        navigate('/hotels');
    }
    },
    {
      label: "Korisnici",
      icon: "pi pi-users",
      command: () => {
        navigate('/customers');
    }
    },
    {
      label: "Statistika",
      icon: "pi pi-graph",
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
};

export default Menu;
