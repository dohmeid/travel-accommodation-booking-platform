import React, { FC } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useAdminContext } from '../../../context/AdminProvider';
import { UseDialog, DialogState } from '../../../hooks/useDialog';
import * as Yup from 'yup';
import classes from './HotelDialog.module.css';

const hotelSchema = Yup.object().shape({
  name: Yup.string().required('Hotel name is a required field!'),
  description: Yup.string().required('Hotel description is a required field!'),
  cityId: Yup.number().required('Hotel city is a required field!'),
  hotelType: Yup.number()
    .required('Hotel type is a required field!')
    .min(0, 'Hotel type must be at least 0'),
  starRating: Yup.number()
    .required('Hotel star rating is a required field!')
    .min(0, 'Star rating must be at least 0')
    .max(5, 'Star rating must be 5 or less'),
  latitude: Yup.number()
    .required('Hotel latitude is a required field!')
    .min(-90, 'Latitude must be at least -90')
    .max(90, 'Latitude must be 90 or less'),
  longitude: Yup.number()
    .required('Hotel longitude is a required field!')
    .min(-180, 'Longitude must be at least -180')
    .max(180, 'Longitude must be 180 or less'),
});

interface DialogFormValues {
  name: string;
  description: string;
  cityId: number;
  hotelType: number;
  starRating: number;
  latitude: number;
  longitude: number;
}

interface Props {
  dialogState: DialogState;
  closeDialog: UseDialog['closeDialog'];
}

const HotelDialog: FC<Props> = ({ dialogState, closeDialog }) => {
  const { cities, createHotel, updateHotel } = useAdminContext();
  const { type, isOpen, hotelData } = dialogState;

  const initialHotelValues = {
    name: hotelData?.name || '',
    description: hotelData?.description || '',
    cityId: 0,
    hotelType: hotelData?.hotelType || 0,
    starRating: hotelData?.starRating || 0,
    latitude: hotelData?.latitude || 0,
    longitude: hotelData?.longitude || 0,
  };

  const handleSubmitAddForm = async (
    values: DialogFormValues,
    { setSubmitting }: FormikHelpers<DialogFormValues>,
  ) => {
    const newHotel = {
      id: hotelData?.id || 0,
      name: values.name,
      description: values.description,
      hotelType: values.hotelType,
      starRating: values.starRating,
      latitude: values.latitude,
      longitude: values.longitude,
    };
    const cityId = values.cityId;

    try {
      if (type === 'Add') {
        await createHotel(cityId, newHotel);
      } else if (type === 'Update') {
        await updateHotel(newHotel);
      }
    } finally {
      closeDialog();
      setSubmitting(false);
    }
  };

  if (!isOpen || !['Add', 'Update'].includes(type)) return null;

  //Hotel: id, name, description, hotelType, starRating, latitude, longitude, actions(delete,update)

  return (
    <div className={classes.dialogContainer}>
      <h2>{type === 'Add' ? 'Add New Hotel' : 'Update Hotel'}</h2>

      <Formik
        initialValues={initialHotelValues}
        validationSchema={hotelSchema}
        onSubmit={handleSubmitAddForm}
      >
        {(formik) => (
          <Form
            aria-labelledby="add-update-hotel-form"
            className={classes.dialogForm}
          >
            <div className={classes.inputContainer}>
              <label htmlFor="name">Hotel Name</label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Hotel name"
                aria-describedby="hotel-name"
                autoComplete="true"
                className={classes.nameField}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={classes.errorAlert}
              />
            </div>

            <div className={classes.inputContainer}>
              <label htmlFor="description">Hotel Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={4}
                placeholder="Hotel description..."
                aria-describedby="hotel-description"
                className={classes.descriptionField}
              />
              <ErrorMessage
                name="description"
                component="div"
                className={classes.errorAlert}
              />
            </div>

            {type === 'Add' && (
              <div className={classes.inputContainer}>
                <label htmlFor="cityId">Hotel City</label>
                <Field
                  as="select"
                  id="cityId"
                  name="cityId"
                  className={classes.cityIdField}
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city.id} label={city.name}>
                      {city.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="cityId"
                  component="div"
                  className={classes.errorAlert}
                />
              </div>
            )}

            <div className={classes.numbersContainer}>
              <div className={classes.inputContainer}>
                <label htmlFor="hotelType">Hotel Type</label>
                <Field
                  type="number"
                  name="hotelType"
                  id="hotelType"
                  aria-describedby="hotel-type"
                  min="0"
                  className={classes.numberField}
                />
                <ErrorMessage
                  name="hotelType"
                  component="div"
                  className={classes.errorAlert}
                />
              </div>

              <div className={classes.inputContainer}>
                <label htmlFor="starRating">Star Rating</label>
                <Field
                  type="number"
                  name="starRating"
                  id="starRating"
                  aria-describedby="starRating"
                  min="0"
                  max="5"
                  className={classes.numberField}
                />
                <ErrorMessage
                  name="starRating"
                  component="div"
                  className={classes.errorAlert}
                />
              </div>
            </div>

            <div className={classes.numbersContainer}>
              <div className={classes.inputContainer}>
                <label htmlFor="latitude">Latitude</label>
                <Field
                  type="number"
                  name="latitude"
                  id="latitude"
                  aria-describedby="latitude"
                  min="-90"
                  max="90"
                  step="any"
                  className={classes.numberField}
                />
                <ErrorMessage
                  name="latitude"
                  component="div"
                  className={classes.errorAlert}
                />
              </div>

              <div className={classes.inputContainer}>
                <label htmlFor="longitude">Longitude</label>
                <Field
                  type="number"
                  name="longitude"
                  id="longitude"
                  aria-describedby="longitude"
                  min="-180"
                  max="180"
                  step="any"
                  className={classes.numberField}
                />
                <ErrorMessage
                  name="longitude"
                  component="div"
                  className={classes.errorAlert}
                />
              </div>
            </div>

            <div className={classes.buttonsContainer}>
              <button
                type="button"
                className={classes.cancelButton}
                onClick={closeDialog}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={classes.addUpdateButton}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting
                  ? type === 'Add'
                    ? 'Adding...'
                    : 'Updating...'
                  : type === 'Add'
                    ? 'Add'
                    : 'Update'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HotelDialog;
