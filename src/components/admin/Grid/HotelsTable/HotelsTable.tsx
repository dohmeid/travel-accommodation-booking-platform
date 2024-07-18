import React, { FC, useContext } from "react";
import HotelRow from "./HotelRow/HotelRow";
import DeleteDialog from "../../DeleteDialog/DeleteDialog";
import AddUpdateDialog from "../../AddUpdateDialog/AddUpdateDialog";
import { AdminContext } from "../../../../context/adminProvider";
import { City, AdminContextType } from "../../../../interfaces/interfaces";
import useDialog from "../../../../hooks/useDialog";
import classes from "./HotelsTable.module.css";

const HotelsTable: FC = () => {
  const { getFilteredCities } = useContext(AdminContext) as AdminContextType;
  const { dialogState, openDialog, closeDialog } = useDialog();

  let citiesArray = getFilteredCities();
  const CITIES = citiesArray.map((city: City, index: number) => (
    <HotelRow key={city.id} cityData={city} openDialog={openDialog} />
  ));

  //Hotels: Name, star rate, owner, room number, creation and modification dates, delete option.
  //Hotel: id, name, description, starRating, hotelType, actions(delete,update)     "latitude": 0, "longitude": 0

  return (
    <>
      <table className={classes.grid}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Hotel Type</th>
            <th>Star Rating</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {citiesArray.length > 0 ? (
            CITIES
          ) : (
            <tr>
              <td colSpan={4}>No cities to display</td>
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr>
            <td>
              Total: <span>{citiesArray.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>

      <DeleteDialog dialogState={dialogState} closeDialog={closeDialog} />
      <AddUpdateDialog dialogState={dialogState} closeDialog={closeDialog} />
    </>
  );
};

export default HotelsTable;
