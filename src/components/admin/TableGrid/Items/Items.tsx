import React, { FC, useContext } from "react";
import classes from "./Items.module.css";
import Item from "./Item/Item";
import { AdminContext } from "../../../../context/adminProvider";
import { City, AdminContextType } from "../../../../interfaces/interfaces";

const Items: FC = () => {
  const { getFilteredCities } = useContext(AdminContext) as AdminContextType;

  let citiesArray = getFilteredCities();
  const CITIES = citiesArray.map((city: City, index: number) => (
    <Item key={city.id} cityData={city} />
  ));

  /*
- Cities: Name, Country, Post Office, Number of hotels, creation and modification dates, and delete option.
- Cities: id, name, description, and actions.

- Hotels: Name, star rate, owner, room number, creation and modification dates, delete option.
- Rooms: Number, availability, adult and children capacity, creation and modification dates, delete option.

*/

  return (
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
  );
};

export default Items;
