/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import HotelsManage from "../features/hotels/pages/HotelsManage";
// import HotelsList from "../features/hotels/pages/HotelsList";
// import HotelsListDetail from "../features/hotels/pages/HotelsListDetail";
// import Customers from "../features/customers/pages/Customers";
import { lazy, Suspense } from "react";

const HotelsManage = lazy(() => import('../features/hotels/pages/HotelsManage'));
const HotelsList = lazy(() => import('../features/hotels/pages/HotelsList'));
const HotelsListDetail = lazy(() => import('../features/hotels/pages/HotelsListDetail'));
const Customers = lazy(() => import('../features/customers/pages/Customers'));
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    ),
    // loader: fetchHotels,
    children: [
      {
        index: true,
        element: <HotelsManage/>
      },
      {
        path: "/hotels",
        element: <HotelsList/>,
        children: [
          {
            path: ":id",
            element: <HotelsListDetail/>
          }
        ]
      },
      {
        path: "customers",
        element: <Customers/>,
      },
    ],
  },
]);
