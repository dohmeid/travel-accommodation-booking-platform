import React, { FC } from 'react';
import { GridType } from '../../../types/adminTypes';
import SearchBar from './SearchBar/SearchBar';
import Grid from './Grid/Grid';
import classes from './Body.module.css';

interface Props {
  gridType: GridType;
}

const Body: FC<Props> = ({ gridType }) => {
  return (
    <section className={classes.body}>
      <SearchBar gridType={gridType} />
      <Grid gridType={gridType} />
    </section>
  );
};

export default Body;
