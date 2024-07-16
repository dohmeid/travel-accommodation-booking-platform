import React, { FC, MouseEvent, useContext } from "react";
import classes from "./AddDialog.module.css";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { AdminContext } from "../../../context/adminProvider";
import { City, AdminContextType } from "../../../interfaces/interfaces";

import * as Yup from "yup";

// the yup module schema for validating the login form
const loginSchema = Yup.object().shape({
  name: Yup.string().required("City name is a required field!"),
  description: Yup.string()
    .required("City description is a required field!")
    .min(5, "Description should be at least 5 characters long"),
});

const initialCityValues = {
  name: "",
  description: "",
};

interface AddFormValues {
  name: string;
  description: string;
}

interface Props {
  setShowAddDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddDialog: FC<Props> = ({ setShowAddDialog }) => {
  const { createCity } = useContext(AdminContext) as AdminContextType;

  const handleCancelButtonClick = () => {
    setShowAddDialog(false);
  };

  const handleSubmitAddForm = async (
    values: AddFormValues,
    { setSubmitting }: FormikHelpers<AddFormValues>
  ) => {
    const newCity = {
      id: 0,
      name: values.name,
      description: values.description,
    };
    createCity(newCity);
    setShowAddDialog(false);
    setSubmitting(false);
  };

  return (
    <div className={classes.addDialog}>
      <h2>Add New City</h2>

      <Formik
        initialValues={initialCityValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmitAddForm}
      >
        {(formik) => (
          <Form aria-labelledby="add new city form" className={classes.addForm}>
            <div className={classes.inputContainer}>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="City name"
                aria-describedby="new city name"
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
                aria-describedby="new city description"
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
                onClick={handleCancelButtonClick}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={classes.addButton}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting ? "Adding..." : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDialog;
