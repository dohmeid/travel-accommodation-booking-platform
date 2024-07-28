import React, { useState, FC, ChangeEvent, useEffect } from "react";
import classes from "./Filters.module.css";
import { useSearchContext } from "../../../context/searchProvider";
import { useFormik } from "formik";
import { Formik, Field, Form } from "formik";

const MAX = 500;

const Filters: FC = () => {
  const { filteredResults, sortBy, setSortBy } = useSearchContext();

  const [hover, setHover] = useState(0);
  const checkList = ["Apple", "Banana", "Tea", "Coffee"];
  const rooms = ["Cabin", "King Suite", "Ocean View", "Standard", "Double"];

  interface FilterFormValues {
    minPrice: number;
    maxPrice: number;
    rating: number;
    amenities: string[];
    room: string;
  }

  const initialFilterValues = {
    minPrice: 0,
    maxPrice: 100,
    rating: 0,
    amenities: [],
    room: "",
  };

  const handleSubmitFilterForm = (values: FilterFormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className={classes.filters}>
      <Formik
        initialValues={initialFilterValues}
        onSubmit={handleSubmitFilterForm}
      >
        {(formik) => {
          useEffect(() => {
            const minRange = document.getElementById(
              "minPrice"
            ) as HTMLInputElement;
            const maxRange = document.getElementById(
              "maxPrice"
            ) as HTMLInputElement;

            if (minRange && maxRange) {
              const minPercent = (formik.values.minPrice / 1000) * 100;
              const maxPercent = (formik.values.maxPrice / 1000) * 100;

              const background = `linear-gradient(to right, 
                      #d3d3d3 ${minPercent}%, 
                      #AA6548 ${minPercent}%, 
                      #AA6548 ${maxPercent}%, 
                      #d3d3d3 ${maxPercent}%)`;

              minRange.style.background = background;
              maxRange.style.background = background;
            }
          }, [formik.values.minPrice, formik.values.maxPrice]);

          return (
            <Form>
              <div
                className={`${classes.titleContainer} ${classes.flexContainer}`}
              >
                <h2>Filter By:</h2>
                <button
                  type="reset"
                  className={classes.clearButton}
                  onClick={() => formik.resetForm()}
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
                    min="0"
                    max="100"
                    step="1"
                    value={formik.values.minPrice}
                    onChange={formik.handleChange}
                  />

                  <Field
                    type="range"
                    id="maxPrice"
                    name="maxPrice"
                    min="0"
                    max="100"
                    step="1"
                    value={formik.values.maxPrice}
                    onChange={formik.handleChange}
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
                        <Field
                          type="radio"
                          name="rating"
                          value={currentRating}
                        />
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
                  {checkList.map((item, index) => (
                    <label key={index}>
                      <Field type="checkbox" name="amenities" value={item} />
                      <span>{item}</span>
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
          );
        }}
      </Formik>
    </div>
  );
};

export default Filters;
