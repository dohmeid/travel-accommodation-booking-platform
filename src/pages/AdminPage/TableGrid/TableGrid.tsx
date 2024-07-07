import React, { useState, FC } from "react";
import classes from "./TableGrid.module.css";

const TableGrid: FC = () => {
  /*
- Cities: Name, Country, Post Office, Number of hotels, creation and modification dates, and delete option.
- Hotels: Name, star rate, owner, room number, creation and modification dates, delete option.
- Rooms: Number, availability, adult and children capacity, creation and modification dates, delete option.

*/

  return (
    <div className={classes.gridContainer}>
      <table className={classes.grid}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Post Office</th>
            <th>Number of hotels</th>
            <th>Creation Date</th>
            <th>Modification Date</th>
            <th>Delete</th>
            <th>Update</th>
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
            </td>
            <td>
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
            </td>
            <td>
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
            </td>
            <td>
              <i className="bi bi-pencil-fill"></i>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={5}>
              Total:
              <span>0</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableGrid;
