import React, { FC, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { hotelDialogSchema } from '../../../../schemas/validationSchemas';
import { UseDialog, DialogState } from '../../../../hooks/useDialog';
import { Hotel } from '../../../../types/adminTypes';
import useHotelsManagement from '../../../../hooks/useHotelsManagement';
import useCitiesManagement from '../../../../hooks/useCitiesManagement';
import classes from './HotelDialog.module.css';

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
  dialogState: DialogState<Hotel>;
  closeDialog: UseDialog['closeDialog'];
}

const HotelDialog: FC<Props> = ({ dialogState, closeDialog }) => {
  const { cities, fetchCities } = useCitiesManagement();
  const { createHotel, updateHotel } = useHotelsManagement();
  const { mode, isOpen, data: hotelData } = dialogState;

  //initially fetch the cities to display then in the dialog options
  useEffect(() => {
    fetchCities();
  }, []);

  const initialHotelValues = {
    name: hotelData?.name || '',
    description: hotelData?.description || '',
    cityId: 0,
    hotelType: hotelData?.hotelType || 0,
    starRating: hotelData?.starRating || 0,
    latitude: hotelData?.latitude || 0,
    longitude: hotelData?.longitude || 0,
  };

  const handleSubmitForm = async (
    values: DialogFormValues,
    { setSubmitting }: FormikHelpers<DialogFormValues>,
  ) => {
    const newHotel = {
      id: hotelData?.id || 0,
      ...values,
    };
    const cityId = values.cityId;

    try {
      if (mode === 'Add') {
        await createHotel(cityId, newHotel);
      } else if (mode === 'Update') {
        await updateHotel(newHotel);
      }
    } finally {
      closeDialog();
      setSubmitting(false);
    }
  };

  if (!isOpen || !['Add', 'Update'].includes(mode)) return null;

  return (
    <div className={classes.dialogContainer}>
      <Formik
        initialValues={initialHotelValues}
        validationSchema={hotelDialogSchema}
        onSubmit={handleSubmitForm}
      >
        {(formik) => (
          <Form
            aria-labelledby="add-update-hotel-form"
            className={classes.dialogForm}
          >
            <h2>{mode === 'Add' ? 'Add New Hotel' : 'Update Hotel'}</h2>

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

            {mode === 'Add' && (
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
                disabled={
                  formik.isSubmitting ||
                  !formik.isValid ||
                  !formik.values.description ||
                  !formik.values.name
                }
              >
                {formik.isSubmitting
                  ? mode === 'Add'
                    ? 'Adding...'
                    : 'Updating...'
                  : mode === 'Add'
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
