import React, { FC, useState, useCallback, ChangeEvent } from 'react';
import { Formik, Field, Form, FormikProps } from 'formik';
import { useSearchContext } from '../../../context/searchProvider';
import { SearchFilters, RoomTypes } from '../../../types/searchTypes';
import {
  PRICE_RANGE,
  INITIAL_FILTERS,
} from '../../../constants/searchDefaults';
import classes from './Filters.module.css';

const Filters: FC = () => {
  const { amenitiesList, setFilters } = useSearchContext();
  const [starHover, setStarHover] = useState(0);

  const handleSubmitFilterForm = useCallback(
    (values: SearchFilters) => {
      setFilters(values);
    },
    [setFilters],
  );

  const handlePriceChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      type: 'minPrice' | 'maxPrice',
      formik: FormikProps<SearchFilters>,
    ) => {
      const value = Number(e.target.value);
      if (
        (type === 'minPrice' && value <= formik.values.maxPrice) ||
        (type === 'maxPrice' && value >= formik.values.minPrice)
      ) {
        formik.setFieldValue(type, value);
      }
    },
    [],
  );

  return (
    <div className={classes.filters}>
      <Formik initialValues={INITIAL_FILTERS} onSubmit={handleSubmitFilterForm}>
        {(formik) => (
          <Form>
            <div
              className={`${classes.titleContainer} ${classes.flexContainer}`}
            >
              <h2>Filter By:</h2>
              <button
                type="reset"
                className={classes.clearButton}
                onClick={() => {
                  formik.resetForm();
                }}
              >
                Clear all
              </button>
            </div>

            <div
              className={`${classes.priceContainer} ${classes.flexContainer}`}
            >
              <label htmlFor="minPrice">Price</label>
              <div className={classes.rangeContainer}>
                <Field
                  type="range"
                  id="minPrice"
                  name="minPrice"
                  min={PRICE_RANGE.MIN}
                  max={PRICE_RANGE.MAX}
                  step="1"
                  value={formik.values.minPrice}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handlePriceChange(e, 'minPrice', formik)
                  }
                />

                <Field
                  type="range"
                  id="maxPrice"
                  name="maxPrice"
                  min={PRICE_RANGE.MIN}
                  max={PRICE_RANGE.MAX}
                  step="1"
                  value={formik.values.maxPrice}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handlePriceChange(e, 'maxPrice', formik)
                  }
                />
              </div>
              <p>
                ${formik.values.minPrice} - ${formik.values.maxPrice}
              </p>
            </div>

            <div
              className={`${classes.starsContainer} ${classes.flexContainer}`}
            >
              <h3>Stars</h3>
              <div>
                {[1, 2, 3, 4, 5].map((index) => {
                  return (
                    <label key={index}>
                      <Field type="radio" name="rating" value={index} />
                      <span
                        className={classes.star}
                        style={{
                          color:
                            index <= (starHover || formik.values.rating)
                              ? '#ffc107'
                              : '#e4e5e9',
                        }}
                        onMouseEnter={() => setStarHover(index)}
                        onMouseLeave={() => setStarHover(0)}
                      >
                        <i className="bi bi-star-fill" />
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div
              className={`${classes.amenitiesContainer} ${classes.flexContainer}`}
            >
              <h3>Amenities</h3>
              <div
                className={classes.list}
                role="group"
                aria-labelledby="checkbox-group"
              >
                {amenitiesList.map((item, index) => (
                  <label key={index}>
                    <Field
                      type="checkbox"
                      name="amenitiesNames"
                      value={item.name}
                    />
                    <span>{item.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div
              className={`${classes.roomContainer} ${classes.flexContainer}`}
            >
              <h3>Room Type</h3>
              <div className={classes.list}>
                {Object.values(RoomTypes).map((room, index) => (
                  <label key={index}>
                    <Field type="radio" name="room" value={room} />
                    <span>{room}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className={classes.applyButton}>
              Apply
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Filters;
