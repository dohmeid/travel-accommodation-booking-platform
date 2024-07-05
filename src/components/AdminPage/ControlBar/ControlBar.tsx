import React, { FC, useContext, ChangeEvent } from "react";
import classes from "./ControlBar.module.css";
import SearchBar from "./SearchBar/SearchBar";

const ControlBar: FC = () => {
  return (
    <div className={classes.controlBar}>
      <SearchBar />

      <button type="button">
        create
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
};

export default ControlBar;
