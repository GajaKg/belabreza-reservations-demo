import "./App.css";
import 'primeicons/primeicons.css';
import type { FC } from "react";

import { SchedulerProvider } from "./features/scheduler/store/SchedulerProvider";
import Scheduler from "./features/scheduler/Scheduler";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: FC = () => {
  return (
    <>
      <SchedulerProvider>
        <Provider store={store}>
          <Scheduler />
        </Provider>
      </SchedulerProvider>
    </>
  );
};

export default App;
