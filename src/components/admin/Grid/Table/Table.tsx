import React, { FC } from 'react';
import { UseDialog } from '../../../../hooks/useDialog';
import { useAdminContext } from '../../../../context/AdminProvider';
import { GridType } from '../../../../types/adminTypes';
import Spinner from '../../../shared/Spinner/Spinner';
import Row from './Row/Row';
import classes from './Table.module.css';

interface Props {
  type: GridType;
  openDialog: UseDialog['openDialog'];
}

const Table: FC<Props> = ({ type, openDialog }) => {
  const { getFilteredCities, getFilteredHotels, isLoading } = useAdminContext();

  const { data, columns } =
    type === GridType.CITY
      ? {
          data: getFilteredCities(),
          columns: ['ID', 'Name', 'Description', 'Action'],
        }
      : {
          data: getFilteredHotels(),
          columns: [
            'ID',
            'Name',
            'Description',
            'Hotel Type',
            'Star Rating',
            'Latitude',
            'Longitude',
            'Action',
          ],
        };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <table
      className={`${classes.grid} 
    ${type === GridType.CITY ? classes.cityGrid : classes.hotelGrid}
    `}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <Row
              key={item.id}
              data={item}
              type={type}
              openDialog={openDialog}
            />
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>No data to display</td>
          </tr>
        )}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={columns.length}>
            Total: <span>{data.length}</span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
