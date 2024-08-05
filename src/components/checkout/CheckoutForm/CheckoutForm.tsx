import React, { useState, FC, useEffect } from "react";
import classes from "./CheckoutForm.module.css";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Snackbar from "../../common/Snackbar/Snackbar";

import { useCartContext } from "../../../context/cartProvider";
import { Booking } from "../../../interfaces/booking";
import { useNavigate } from "react-router-dom";

// the yup module schema for validating the login form
const checkoutSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("first name is required!")
    .min(3, "first name must be 3 characters minimum"),
  lastName: Yup.string()
    .required("last name is required!")
    .min(3, "last name must be 3 characters minimum"),
  email: Yup.string()
    .email("It should be a valid email")
    .required("email is required!"),
  phoneNumber: Yup.string()
    .required("phone number is required!")
    .length(8, "phone number must be 8 numbers long"),
  paymentMethod: Yup.string().required("payment method is required!"),

  cardNumber: Yup.string()
    .required("card number is required!")
    .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Invalid card number"),
  cardExpiryDate: Yup.string()
    .required("card expiry date is required!")
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Invalid expiry date format (MM/YY)"
    ),
  cardCVV: Yup.string()
    .required("Card Verification Value is required!")
    .matches(/^[0-9]{3,4}$/, "Invalid CVV"),
  requests: Yup.string(),
});

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  paymentMethod: string;
  cardNumber: string;
  cardExpiryDate: string;
  cardCVV: string;
  requests: string;
}

const initialCheckoutValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  paymentMethod: "masterCard",
  cardNumber: "",
  cardExpiryDate: "",
  cardCVV: "",
  requests: "",
};

const CheckoutForm: FC = () => {
  const navigate = useNavigate();

  const { cartItems, checkoutBooking, getTotalPrice } =
    useCartContext();
  const getCurrentDate = (): string => {
    const date = new Date();
    return date.toISOString();
  };

  const handleSubmitCheckoutForm = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const bookingData = {
      customerName: values.firstName + " " + values.lastName,
      hotelName: "",
      roomNumber: cartItems[0].roomNumber,
      roomType: cartItems[0].roomType,
      bookingDateTime: getCurrentDate(), //"2024-08-03T20:01:47.334Z";
      totalCost: getTotalPrice(),
      paymentMethod: values.paymentMethod,
    };

    try {
      checkoutBooking(bookingData);
      console.log("Successful Booking!");      
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={classes.formContainer}>
      <h2>Billing Address & Payment</h2>

      <Formik
        initialValues={initialCheckoutValues}
        validationSchema={checkoutSchema}
        onSubmit={handleSubmitCheckoutForm}
      >
        {(formik) => (
          <Form
            aria-labelledby="checkout information"
            className={classes.checkoutForm}
          >
            <div className={classes.flexContainer}>
              <div className={classes.inputContainer}>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  aria-describedby="firstNameAlert"
                  autoComplete="true"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className={classes.errorAlert}
                />
              </div>
              <div className={classes.inputContainer}>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  aria-describedby="passwordAlert"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className={classes.errorAlert}
                />
              </div>
            </div>

            <div className={classes.inputContainer}>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                aria-describedby="emailAlert"
                autoComplete="true"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={classes.errorAlert}
              />
            </div>

            <div className={classes.inputContainer}>
              <Field
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                aria-describedby="phoneNumberAlert"
                autoComplete="true"
                maxLength={8}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className={classes.errorAlert}
              />
            </div>

            <div className={classes.inputContainer}>
              <Field as="select" name="paymentMethod">
                <option value="masterCard">Master Card</option>
                <option value="paypal">Paypal</option>
                <option value="visa">Visa</option>
              </Field>

              <ErrorMessage
                name="paymentMethod"
                component="div"
                className={classes.errorAlert}
              />
            </div>

            <div className={classes.inputContainer}>
              <Field
                type="text"
                name="cardNumber"
                id="cardNumber"
                placeholder="Card Number:  1111-2222-3333-4444"
                aria-describedby="cardNumberAlert"
                autoComplete="true"
                maxLength={19}
              />
              <ErrorMessage
                name="cardNumber"
                component="div"
                className={classes.errorAlert}
              />
            </div>

            <div className={classes.flexContainer}>
              <div className={classes.inputContainer}>
                <Field
                  type="text"
                  name="cardExpiryDate"
                  id="cardExpiryDate"
                  placeholder="MM/YY: 01/25"
                  aria-describedby="cardExpiryDateAlert"
                  autoComplete="true"
                  maxLength={5}
                />
                <ErrorMessage
                  name="cardExpiryDate"
                  component="div"
                  className={classes.errorAlert}
                />
              </div>

              <div className={classes.inputContainer}>
                <Field
                  type="text"
                  name="cardCVV"
                  id="cardCVV"
                  placeholder="CVV:  123"
                  aria-describedby="cardCVVAlert"
                  autoComplete="true"
                  maxLength={4}
                />
                <ErrorMessage
                  name="cardCVV"
                  component="div"
                  className={classes.errorAlert}
                />
              </div>
            </div>

            <div className={classes.inputContainer}>
              <Field
                as="textarea"
                id="requests"
                name="requests"
                rows={4}
                placeholder="Special requests or remarks"
                aria-describedby="special requests or remarks"
              />
              <ErrorMessage
                name="requests"
                component="div"
                className={classes.errorAlert}
              />
            </div>

            <button
              type="submit"
              className={classes.checkoutButton}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? "Checkout..." : "Checkout"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutForm;