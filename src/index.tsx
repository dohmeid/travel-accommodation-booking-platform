import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthenticationProvider } from "../src/context/authentication";
import { BrowserRouter } from "react-router-dom";
import { AdminProvider } from "../src/context/adminProvider";
import { ErrorProvider } from "./context/ErrorProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorProvider>
      <BrowserRouter>
        <AdminProvider>
          <AuthenticationProvider>
            <App />
          </AuthenticationProvider>
        </AdminProvider>
      </BrowserRouter>
    </ErrorProvider>
  </React.StrictMode>
);
