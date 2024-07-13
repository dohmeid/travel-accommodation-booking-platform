import React, { FC, useEffect } from "react";
import classes from "./TableGrid.module.css";
import { getCities, createCity } from "../../../services/Api/adminApi";

const TableGrid: FC = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await getCities();

      console.log("got all the cities successfully");
      console.log(responseData);

      const { id, name, description } = responseData;

      console.log("id = " + id);
      console.log("name = " + name);
    } catch (error: any) {
      console.log(error.message);
    } finally {
    }
  };

  const handleCreateButtonClick = async () => {
    let newName = "Pariss";
    let newDescription = " Fall in love with the romantic charm of Paris, the 'City of Lights.' Admire the Eiffel Tower, stroll along the Seine River, and savor delicious pastries in charming cafes.";
    try {
      const responseData = await createCity(newName, newDescription);
      console.log("created new city successfully");
      console.log(responseData);
    } catch (error: any) {
      console.log(error.message);
    } finally {
    }

    //to see the new results
    fetchData();
  };
  /*
- Cities: Name, Country, Post Office, Number of hotels, creation and modification dates, and delete option.
- Hotels: Name, star rate, owner, room number, creation and modification dates, delete option.
- Rooms: Number, availability, adult and children capacity, creation and modification dates, delete option.

*/

  return (
    <div className={classes.gridContainer}>
      <div className={classes.gridHeader}>
        <h2>Cities List</h2>
        <button
          type="button"
          className={classes.createBtn}
          onClick={handleCreateButtonClick}
        >
          Create
          <i className="bi bi-plus"></i>
        </button>
      </div>

      <table className={classes.grid}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>P.O.</th>
            <th>Hotels #</th>
            <th>Creation Date</th>
            <th>Modification Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>city1</td>
            <td>country1</td>
            <td>po101</td>
            <td>10</td>
            <td>6/7/2024</td>
            <td>6/7/2024</td>
            <td>
              <i className="bi bi-trash-fill"></i>
              <i className="bi bi-pencil-fill"></i>
            </td>
          </tr>
          <tr>
            <td>city2</td>
            <td>country2</td>
            <td>po101</td>
            <td>10</td>
            <td>6/7/2024</td>
            <td>6/7/2024</td>
            <td>
              <i className="bi bi-trash-fill"></i>
              <i className="bi bi-pencil-fill"></i>
            </td>
          </tr>
          <tr>
            <td>city3</td>
            <td>country3</td>
            <td>po101</td>
            <td>10</td>
            <td>6/7/2024</td>
            <td>6/7/2024</td>
            <td>
              <i className="bi bi-trash-fill"></i>
              <i className="bi bi-pencil-fill"></i>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>
              Total :<span>3</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableGrid;
