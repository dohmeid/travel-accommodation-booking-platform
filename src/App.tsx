import React, { FC } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import AdminPage from "./components/AdminPage/AdminPage";
import HomePage from "./components/HomePage/HomePage";

const App: FC = () => {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
};

export default App;
