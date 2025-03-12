/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter } from "react-router-dom";
import HotelsManage from "../features/hotels/pages/HotelsManage";
import App from "../App";
import HotelsList from "../features/hotels/pages/HotelsList";
import HotelsListDetail from "../features/hotels/pages/HotelsListDetail";

// export const fetchHotels = async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/hotels");
//     return response.data; // React Router will pass this to useLoaderData()
//   } catch (error) {
//     throw new Response("Failed to fetch hotels", { status: error.response?.status || 500 });
//   }
// };

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    // loader: fetchHotels,
    children: [
      {
        path: "",
        element: <HotelsManage></HotelsManage>,
      },
      {
        path: "/hotels",
        element: <HotelsList></HotelsList>,
        children: [
          { 
            path: ":id", 
            element: <HotelsListDetail></HotelsListDetail>
          }
        ]
      },
    ],
  },
]);
