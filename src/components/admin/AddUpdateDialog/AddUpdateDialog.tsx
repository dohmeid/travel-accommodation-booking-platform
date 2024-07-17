import React, { FC, useContext } from "react";
import classes from "./AddUpdateDialog.module.css";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { AdminContext } from "../../../context/adminProvider";
import { AdminContextType } from "../../../interfaces/interfaces";
import { UseDialog, DialogState } from "../../../hooks/useDialog";
import * as Yup from "yup";

// the yup module schema for validating the form
const citySchema = Yup.object().shape({
  name: Yup.string().required("City name is a required field!"),
  description: Yup.string()
    .required("City description is a required field!")
    .min(5, "Description should be at least 5 characters long"),
});

interface DialogFormValues {
  name: string;
  description: string;
}

interface Props {
  dialogState: DialogState;
  closeDialog: UseDialog["closeDialog"];
}

const AddUpdateDialog: FC<Props> = ({ dialogState, closeDialog }) => {
  const { createCity, updateCity } = useContext(
    AdminContext
  ) as AdminContextType;

  const initialCityValues = {
    name: dialogState.data.name,
    description: dialogState.data.description,
  };

  const handleSubmitAddForm = async (
    values: DialogFormValues,
    { setSubmitting }: FormikHelpers<DialogFormValues>
  ) => {
    const newCity = {
      id: dialogState.data.id,
      name: values.name,
      description: values.description,
    };

    if (dialogState.type === "Add") {
      createCity(newCity);
    } else {
      //dialogState.type === "Update"
      updateCity(newCity);
    }

    closeDialog();
    setSubmitting(false);
  };

  if (
    !dialogState.isOpen ||
    (dialogState.type !== "Add" && dialogState.type !== "Update")
  )
    return null;

  return (
    <div className={classes.dialogContainer}>
      <h2>{dialogState.type === "Add" ? "Add New City" : "Update City"}</h2>

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
                  ? dialogState.type === "Add"
                    ? "Adding..."
                    : "Updating..."
                  : dialogState.type === "Add"
                  ? "Add"
                  : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUpdateDialog;
