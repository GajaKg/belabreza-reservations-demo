import "./App.css";
import "primeicons/primeicons.css";
import { useEffect, useState, type FC } from "react";

import Menu from "./core/components/Menu";
import { Outlet } from "react-router";
import { useAppDispatch } from "./store/hooks";
import { fetchData } from "./features/hotels/store/hotels-actions";
import { fetchCustomers } from "./features/customers/store/customers-actions";
import { ToastContainer } from "react-toastify";


const App: FC = () => {
  const dispatch = useAppDispatch();

  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchData());
      dispatch(fetchCustomers());
      setIsFetched(true);
    }
  }, [isFetched, dispatch])

  return (
    <>
      <Menu />
      <Outlet />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
