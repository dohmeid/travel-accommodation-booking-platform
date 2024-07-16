import React, { FC, useContext, MouseEvent, useState } from "react";
import classes from "./Items.module.css";
import Item from "./Item/Item";
import { AdminContext } from "../../../../context/adminProvider";
import { City, AdminContextType } from "../../../../interfaces/interfaces";
import DeleteDialog from "../../DeleteDialog/DeleteDialog";

const Items: FC = () => {
  const { getFilteredCities, deleteCity } = useContext(
    AdminContext
  ) as AdminContextType;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(-1);

  let citiesArray = getFilteredCities();
  const CITIES = citiesArray.map((city: City, index: number) => (
    <Item
      key={city.id}
      cityData={city}
      setCityToDelete={setCityToDelete}
      setShowDeleteDialog={setShowDeleteDialog}
    />
  ));

  /*
- Cities: Name, Country, Post Office, Number of hotels, creation and modification dates, and delete option.
- Cities: id, name, description, and actions.

- Hotels: Name, star rate, owner, room number, creation and modification dates, delete option.
- Rooms: Number, availability, adult and children capacity, creation and modification dates, delete option.

*/

  //this function activates when the user clicks on Close button -> closes delete/edit dialog
  const handleCloseButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowDeleteDialog(false);
  };

  //this function activates when the user clicks on the delete button
  const handleDeleteButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteCity(cityToDelete);
    setShowDeleteDialog(false);
  };

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

      {showDeleteDialog && (
        <DeleteDialog
          handleCloseButtonClick={handleCloseButtonClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
        />
      )}

    </>
  );
};

export default Items;
