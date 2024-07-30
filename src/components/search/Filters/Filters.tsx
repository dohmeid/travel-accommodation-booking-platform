import React, { useState, FC, ChangeEvent, useEffect, useRef } from "react";
import classes from "./Filters.module.css";
import { Formik, Field, Form } from "formik";
import { SearchFilters } from "../../../interfaces/interfaces";
import { useSearchContext } from "../../../context/searchProvider";

const Filters: FC = () => {
  const { initialFilters, setFilters, priceRange, amenitiesList } =
    useSearchContext();

  const [hover, setHover] = useState(0);
  const rooms = ["Cabin", "King Suite", "Ocean View", "Standard", "Double"];

  const handleSubmitFilterForm = (values: SearchFilters) => {
    setFilters(values);
  };

  return (
    <div className={classes.filters}>
      <Formik initialValues={initialFilters} onSubmit={handleSubmitFilterForm}>
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
                  min={priceRange.min}
                  max={priceRange.max}
                  step="1"
                  value={formik.values.minPrice}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    if (Number(value) <= formik.values.maxPrice)
                      formik.setFieldValue("minPrice", value);
                  }}
                />

                <Field
                  type="range"
                  id="maxPrice"
                  name="maxPrice"
                  min={priceRange.min}
                  max={priceRange.max}
                  step="1"
                  value={formik.values.maxPrice}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    if (Number(value) >= formik.values.minPrice)
                      formik.setFieldValue("maxPrice", value);
                  }}
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
                {[1, 2, 3, 4, 5].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <label key={index}>
                      <Field type="radio" name="rating" value={currentRating} />
                      <span
                        className={classes.star}
                        style={{
                          color:
                            currentRating <= (hover || formik.values.rating)
                              ? "#ffc107"
                              : "#e4e5e9",
                        }}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(0)}
                      >
                        <i className="bi bi-star-fill"></i>
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
                {rooms.map((item, index) => (
                  <label key={index}>
                    <Field type="radio" name="room" value={item} />
                    <span>{item}</span>
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
