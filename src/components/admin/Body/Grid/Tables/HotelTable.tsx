import React, { ChangeEvent, FC, useEffect } from 'react';
import { UseDialog } from '../../../../../hooks/useDialog';
import { GridType } from '../../../../../types/adminTypes';
import { HOTEL_HEADER } from '../../../../../constants/gridConstants';
import useHotelsManagement from '../../../../../hooks/useHotelsManagement';
import Spinner from '../../../../shared/Spinner/Spinner';
import Row from '../Row/Row';
import classes from './Table.module.css';

interface Props {
  openDialog: UseDialog['openDialog'];
}

const Table: FC<Props> = ({ openDialog }) => {
  //**************************STATES & HOOKS*******************************
  const { hotelsResponse, fetchHotels, isLoading } = useHotelsManagement();
  const { data: hotels, pagination: paginationData } = hotelsResponse;
  const currPage = paginationData.CurrentPage;

  useEffect(() => {
    fetchHotels(currPage);
  }, []);

  //*******************************FUNCTIONS*******************************
  const handlePrevPageClick = () => {
    if (currPage > 1) fetchHotels(currPage - 1);
  };

  const handleNextPageClick = () => {
    if (currPage < paginationData.TotalPageCount) fetchHotels(currPage + 1);
  };

  const handleSelectPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    fetchHotels(Number(e.target.value));
  };

  const calculateStartIndex = () => {
    return currPage === 1 ? 0 : paginationData.PageSize * (currPage - 1) + 1;
  };

  const calculateEndIndex = (index: number) => {
    return Math.min(
      index + paginationData.PageSize,
      paginationData.TotalItemCount,
    );
  };

  const startIndex = calculateStartIndex();
  const endIndex = calculateEndIndex(startIndex);

  return (
    <>
      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <table className={`${classes.grid} ${classes.hotelGrid}`}>
          <thead>
            <tr>
              {HOTEL_HEADER.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hotels.length > 0 ? (
              hotels.map((item, index) => (
                <Row
                  key={index}
                  data={item}
                  type={GridType.HOTEL}
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

      <div className={classes.paginationContainer}>
        <p className={classes.currPagesNumber}>
          {startIndex}-{endIndex} of {paginationData.TotalItemCount}{' '}
        </p>

        <div className={classes.pageNavButtons}>
          <button
            className={classes.prevButton}
            disabled={currPage === 1}
            onClick={handlePrevPageClick}
          >
            <i className="bi bi-arrow-left"></i>

            <span>Prev</span>
          </button>

          <div>
            Page
            <select
              name="pageNumber"
              className={classes.selectPage}
              value={currPage}
              onChange={handleSelectPageChange}
            >
              {Array.from({ length: paginationData.TotalPageCount }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>{' '}
            of {paginationData.TotalPageCount}
          </div>

          <button
            className={classes.nextButton}
            disabled={currPage === paginationData.TotalPageCount}
            onClick={handleNextPageClick}
          >
            <span>Next</span>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
