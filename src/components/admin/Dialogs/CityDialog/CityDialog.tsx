import React, { FC } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { cityDialogSchema } from '../../../../schemas/validationSchemas';
import { useAdminContext } from '../../../../context/AdminProvider';
import { UseDialog, DialogState } from '../../../../hooks/useDialog';
import { City } from '../../../../types/adminTypes';
import classes from './CityDialog.module.css';

interface DialogFormValues {
  name: string;
  description: string;
}

interface Props {
  dialogState: DialogState<City>;
  closeDialog: UseDialog['closeDialog'];
}

const CityDialog: FC<Props> = ({ dialogState, closeDialog }) => {
  const { createCity, updateCity } = useAdminContext();
  const { mode, isOpen, data: cityData } = dialogState;

  const initialCityValues = {
    name: cityData?.name || '',
    description: cityData?.description || '',
  };

  const handleSubmitForm = async (
    values: DialogFormValues,
    { setSubmitting }: FormikHelpers<DialogFormValues>,
  ) => {
    const newCity = {
      id: cityData?.id || 0,
      ...values,
    };

    try {
      if (mode === 'Add') {
        await createCity(newCity);
      } else if (mode === 'Update') {
        await updateCity(newCity);
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
        initialValues={initialCityValues}
        validationSchema={cityDialogSchema}
        onSubmit={handleSubmitForm}
      >
        {(formik) => (
          <Form
            aria-labelledby="add-update-city-form"
            className={classes.dialogForm}
          >
            <h2>{mode === 'Add' ? 'Add New City' : 'Update City'}</h2>

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
                disabled={
                  formik.isSubmitting ||
                  !formik.isValid ||
                  !formik.values.name ||
                  !formik.values.description
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

export default CityDialog;
