import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthenticationProvider } from "../src/context/authentication";
import { BrowserRouter } from "react-router-dom";
import { AdminProvider } from "../src/context/adminProvider";
import { HomeProvider } from "./context/homeProvider";
import { ErrorProvider } from "./context/ErrorProvider";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorProvider>
      <BrowserRouter>
        <AdminProvider>
          <AuthenticationProvider>
            <HomeProvider>
              <App />
            </HomeProvider>
          </AuthenticationProvider>
        </AdminProvider>
      </BrowserRouter>
    </ErrorProvider>
  </React.StrictMode>
);
