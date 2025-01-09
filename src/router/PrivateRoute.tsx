/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Scheduler from "../features/scheduler/Scheduler";
import Hotels from "../features/hotels/Hotels";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: <Scheduler></Scheduler>,
      },
      {
        path: "/hotels",
        element: <Hotels></Hotels>,
      },
    ],
  },
]);
