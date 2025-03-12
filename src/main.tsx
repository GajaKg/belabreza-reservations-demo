import "./index.css";
// import "primereact/resources/themes/vela-green/theme.css";
// import "primereact/resources/themes/arya-green/theme.css";
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { router } from "./router/PrivateRoute.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PrimeReactProvider>
  </StrictMode>
);
