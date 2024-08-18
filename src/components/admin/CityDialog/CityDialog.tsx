import React, { FC } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useAdminContext } from '../../../context/AdminProvider';
import { UseDialog, DialogState } from '../../../hooks/useDialog';
import * as Yup from 'yup';
import classes from './CityDialog.module.css';

// the yup module schema for validating the form
const citySchema = Yup.object().shape({
  name: Yup.string().required('City name is a required field!'),
  description: Yup.string()
    .required('City description is a required field!')
    .min(3, 'Description should be at least 3 characters long'),
});

interface DialogFormValues {
  name: string;
  description: string;
}

interface Props {
  dialogState: DialogState;
  closeDialog: UseDialog['closeDialog'];
}

const CityDialog: FC<Props> = ({ dialogState, closeDialog }) => {
  const { createCity, updateCity } = useAdminContext();
  const { type, isOpen, cityData } = dialogState;

  const initialCityValues = {
    name: cityData?.name || '',
    description: cityData?.description || '',
  };

  const handleSubmitAddForm = async (
    values: DialogFormValues,
    { setSubmitting }: FormikHelpers<DialogFormValues>,
  ) => {
    const newCity = {
      id: cityData?.id || 0,
      name: values.name,
      description: values.description,
    };

    try {
      if (type === 'Add') {
        await createCity(newCity);
      } else if (type === 'Update') {
        await updateCity(newCity);
      }
    } finally {
      closeDialog();
      setSubmitting(false);
    }
  };

  if (!isOpen || !['Add', 'Update'].includes(type)) return null;

  return (
    <div className={classes.dialogContainer}>
      <h2>{dialogState.type === 'Add' ? 'Add New City' : 'Update City'}</h2>

      <Formik
        initialValues={initialCityValues}
        validationSchema={citySchema}
        onSubmit={handleSubmitAddForm}
      >
        {(formik) => (
          <Form
            aria-labelledby="add-update-city-form"
            className={classes.dialogForm}
          >
            <div className={classes.inputContainer}>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="City name"
                aria-describedby="city-name"
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
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={13}
                placeholder="City description..."
                aria-describedby="city-description"
                className={classes.descriptionField}
              />
              <ErrorMessage
                name="description"
                component="div"
                className={classes.errorAlert}
              />
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

export default CityDialog;
