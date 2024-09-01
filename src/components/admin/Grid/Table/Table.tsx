import React, { ChangeEvent, FC } from 'react';
import { UseDialog } from '../../../../hooks/useDialog';
import { useAdminContext } from '../../../../context/adminProvider';
import { GridType } from '../../../../types/adminTypes';
import Spinner from '../../../shared/Spinner/Spinner';
import Row from './Row/Row';
import classes from './Table.module.css';

interface Props {
  type: GridType;
  openDialog: UseDialog['openDialog'];
}

const Table: FC<Props> = ({ type, openDialog }) => {
  const {
    paginationData,
    page,
    isLoading,
    setPage,
    getFilteredCities,
    getFilteredHotels,
  } = useAdminContext();

  const handlePrevPageClick = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPageClick = () => {
    if (page < paginationData.TotalPageCount) setPage((prev) => prev + 1);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPage(Number(e.target.value));
  };

  const calculateStartIndex = () => {
    return paginationData.CurrentPage === 1
      ? 0
      : paginationData.PageSize * (paginationData.CurrentPage - 1) + 1;
  };

  const calculateEndIndex = (index: number) => {
    return Math.min(
      index + paginationData.PageSize,
      paginationData.TotalItemCount,
    );
  };

  const startIndex = calculateStartIndex();
  const endIndex = calculateEndIndex(startIndex);

  const { data, columns } =
    type === GridType.CITY || type === GridType.ROOM
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

  const renderPageOptions = () =>
    Array.from({ length: paginationData.TotalPageCount }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ));

  return (
    <>
      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <table
          className={`${classes.grid} 
    ${type === GridType.CITY || type === GridType.ROOM ? classes.cityGrid : classes.hotelGrid}
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
        </table>
      )}

      {type === GridType.HOTEL && (
        <div className={classes.paginationContainer}>
          <p className={classes.currPagesNumber}>
            {startIndex}-{endIndex} of {paginationData.TotalItemCount}{' '}
          </p>

          <div className={classes.pageNavButtons}>
            <button
              className={classes.prevButton}
              disabled={page === 1}
              onClick={handlePrevPageClick}
            >
              <i className="bi bi-arrow-left"></i>

              <span>Prev</span>
            </button>

            <div>
              Page{' '}
              <select
                name="pageNumber"
                className={classes.selectPage}
                value={page}
                onChange={handleSelectChange}
              >
                {renderPageOptions()}
              </select>{' '}
              of {paginationData.TotalPageCount}
            </div>

            <button
              className={classes.nextButton}
              disabled={page === paginationData.TotalPageCount}
              onClick={handleNextPageClick}
            >
              <span>Next</span>
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
