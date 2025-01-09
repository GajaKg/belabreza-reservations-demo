import type { FC } from "react";

import { Menubar } from "primereact/menubar";

const Menu: FC = () => {
  const items = [
    {
      label: "Početna",
      icon: "pi pi-home",
    },
    {
      label: "Hoteli",
      icon: "pi pi-star",
    },
    {
      label: "Statistika",
      icon: "pi pi-envelope",
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
};

export default Menu;
