import React, { FC, useContext } from "react";
import CityRow from "./CityRow/CityRow";
import DeleteDialog from "../../DeleteDialog/DeleteDialog";
import CityDialog from "../../CityDialog/CityDialog";
import { AdminContext } from "../../../../context/adminProvider";
import { City, AdminContextType } from "../../../../interfaces/adminTypes";
import useDialog from "../../../../hooks/useDialog";
import classes from "./CitiesTable.module.css";

const CitiesTable: FC = () => {
  const { getFilteredCities } = useContext(AdminContext) as AdminContextType;
  const { dialogState, openDialog, closeDialog } = useDialog();

  let citiesArray = getFilteredCities();
  const CITIES = citiesArray.map((city: City, index: number) => (
    <CityRow key={city.id} cityData={city} openDialog={openDialog} />
  ));

  return (
    <>
      <table className={classes.grid}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
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
      <CityDialog dialogState={dialogState} closeDialog={closeDialog} />
    </>
  );
};

export default CitiesTable;
