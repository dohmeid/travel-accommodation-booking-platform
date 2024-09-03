import React, { FC, useEffect } from 'react';
import { UseDialog } from '../../../../../hooks/useDialog';
import { GridType } from '../../../../../types/adminTypes';
import { CITY_HEADER } from '../../../../../constants/gridConstants';
import useCitiesManagement from '../../../../../hooks/useCitiesManagement';
import Spinner from '../../../../shared/Spinner/Spinner';
import Row from '../Row/Row';
import classes from './Table.module.css';

interface Props {
  openDialog: UseDialog['openDialog'];
}

const CityTable: FC<Props> = ({ openDialog }) => {
  const { fetchCities, getFilteredCities, isLoading } = useCitiesManagement();

  useEffect(() => {
    fetchCities();
  }, []);

  const data = getFilteredCities();

  return (
    <>
      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <table
          className={`${classes.grid} ${classes.cityGrid}
    `}
        >
          <thead>
            <tr>
              {CITY_HEADER.map((column) => (
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
                  type={GridType.CITY}
                  openDialog={openDialog}
                />
              ))
            ) : (
              <tr className={classes.noDataRow}>
                <td>No data to display </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CityTable;
