import React, { FC, useMemo } from 'react';
import { useAdminContext } from '../../../../context/AdminProvider';
import CityRow from './CityRow/CityRow';
import classes from './CitiesTable.module.css';

const CitiesTable: FC = () => {
  const { getFilteredCities } = useAdminContext();
  const citiesArray = useMemo(() => getFilteredCities(), [getFilteredCities]);

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
          citiesArray.map((city) => <CityRow key={city.id} cityData={city} />)
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

export default CitiesTable;
