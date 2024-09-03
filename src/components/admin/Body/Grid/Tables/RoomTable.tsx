import React, { FC, useEffect } from 'react';
import { UseDialog } from '../../../../../hooks/useDialog';
import { GridType } from '../../../../../types/adminTypes';
import { ROOM_HEADER } from '../../../../../constants/gridConstants';
import useRoomsManagement from '../../../../../hooks/useRoomsManagement';
import Spinner from '../../../../shared/Spinner/Spinner';
import Row from '../Row/Row';
import classes from './Table.module.css';

interface Props {
  openDialog: UseDialog['openDialog'];
}

const RoomTable: FC<Props> = ({ openDialog }) => {
  const { fetchRooms, isLoading, getFilteredRooms } = useRoomsManagement();

  useEffect(() => {
    fetchRooms();
  }, []);

  const data = getFilteredRooms();

  return (
    <>
      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <table className={`${classes.grid}  ${classes.roomGrid}`}>
          <thead>
            <tr>
              {ROOM_HEADER.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <Row
                  key={index}
                  data={item}
                  type={GridType.ROOM}
                  openDialog={openDialog}
                />
              ))
            ) : (
              <tr className={classes.noDataRow}>
                <td>No data to display</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default RoomTable;
