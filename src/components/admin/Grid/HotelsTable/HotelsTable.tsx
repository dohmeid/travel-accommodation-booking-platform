import React, { FC, useMemo } from "react";
import { useAdminContext } from "../../../../context/AdminProvider";
import HotelRow from "./HotelRow/HotelRow";
import classes from "./HotelsTable.module.css";

const HotelsTable: FC = () => {
  const { getFilteredHotels } = useAdminContext();

  const hotelsArray = useMemo(() => getFilteredHotels(), [getFilteredHotels]);

  return (
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
          hotelsArray.map((hotel) => (
            <HotelRow key={hotel.id} hotelData={hotel} />
          ))
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
  );
};

export default HotelsTable;
