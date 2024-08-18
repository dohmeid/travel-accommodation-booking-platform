import React, { FC } from 'react';
import useDialog from '../../../hooks/useDialog';
import CitiesTable from './CitiesTable/CitiesTable';
import HotelsTable from './HotelsTable/HotelsTable';
import CityDialog from '../CityDialog/CityDialog';
import HotelDialog from '../HotelDialog/HotelDialog';
import classes from './Grid.module.css';

interface GridProps {
  gridType: 'city' | 'hotel' | 'room';
}

const Grid: FC<GridProps> = ({ gridType }) => {
  const { dialogState, openDialog, closeDialog } = useDialog();

  let title = '';
  if (gridType === 'city') {
    title = 'Cities List';
  } else if (gridType === 'hotel') {
    title = 'Hotels List';
  } else {
    title = 'Rooms List';
  }

  const handleCreateButtonClick = () => {
    if (gridType === 'city') {
      openDialog('City', 'Add');
    } else {
      openDialog('Hotel', 'Add');
    }
  };

  return (
    <div className={classes.gridContainer}>
      <div className={classes.gridHeader}>
        <h2>{title}</h2>
        <button
          type="button"
          className={classes.createBtn}
          onClick={handleCreateButtonClick}
        >
          Create
          <i className="bi bi-plus"></i>
        </button>
      </div>

      {gridType === 'city' ? <CitiesTable /> : <HotelsTable />}

      {gridType === 'city' ? (
        <CityDialog dialogState={dialogState} closeDialog={closeDialog} />
      ) : (
        <HotelDialog dialogState={dialogState} closeDialog={closeDialog} />
      )}
    </div>
  );
};

export default Grid;
