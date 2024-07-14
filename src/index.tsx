import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthenticationProvider } from "../src/context/authentication";
import { BrowserRouter } from "react-router-dom";
import {AdminProvider} from "../src/context/adminProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <AdminProvider>
        <App />
        </AdminProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
