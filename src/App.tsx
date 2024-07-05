import React, { FC } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import AdminPage from "./components/AdminPage/AdminPage";

const App: FC = () => {
  return (
    <div className="App">
      <AdminPage />
    </div>
  );
};

export default App;
