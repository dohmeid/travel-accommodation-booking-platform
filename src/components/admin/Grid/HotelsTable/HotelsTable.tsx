import React, { FC, useContext } from "react";
import HotelRow from "./HotelRow/HotelRow";
import DeleteDialog from "../../DeleteDialog/DeleteDialog";
import HotelDialog from "../../HotelDialog/HotelDialog";
import { AdminContext } from "../../../../context/adminProvider";
import { Hotel, City, AdminContextType } from "../../../../interfaces/interfaces";
import useDialog from "../../../../hooks/useDialog";
import classes from "./HotelsTable.module.css";

const HotelsTable: FC = () => {
  const { getFilteredHotels } = useContext(AdminContext) as AdminContextType;
  const { dialogState, openDialog, closeDialog } = useDialog();

  let hotelsArray = getFilteredHotels();
  const HOTELS = hotelsArray.map((hotel: Hotel) => (
    <HotelRow key={hotel.id} hotelData={hotel} openDialog={openDialog} />
  ));

  //Hotels: Name, star rate, owner, room number, creation and modification dates, delete option.
  //Hotel: id, name, description, hotelType, starRating, latitude, longitude, actions(delete,update)

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
          {hotelsArray.length > 0 ? (
            HOTELS
          ) : (
            <tr>
              <td colSpan={4}>No hotels to display</td>
            </tr>
          )}
        </tbody>

        <tfoot>
          <tr>
            <td>
              Total: <span>{hotelsArray.length}</span>
            </td>
          </tr>
        </tfoot>
      </table>

      <DeleteDialog dialogState={dialogState} closeDialog={closeDialog} />
      <HotelDialog dialogState={dialogState} closeDialog={closeDialog} />
    </>
  );
};

export default HotelsTable;
