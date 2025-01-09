import "./App.css";
import "primeicons/primeicons.css";
import type { FC } from "react";

import { SchedulerProvider } from "./features/scheduler/store/SchedulerProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Menu from "./core/components/Menu";
import { Outlet } from "react-router";

const App: FC = () => {
  return (
    <>
      <SchedulerProvider>
        <Provider store={store}>
          <Menu />
          <Outlet/>
        </Provider>
      </SchedulerProvider>
    </>
  );
};

export default App;
