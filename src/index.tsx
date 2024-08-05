import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/authProvider";
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
          <AuthProvider>
            <HomeProvider>
              <App />
            </HomeProvider>
          </AuthProvider>
        </AdminProvider>
      </BrowserRouter>
    </ErrorProvider>
  </React.StrictMode>
);
