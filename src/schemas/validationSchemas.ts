import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is a required field!'),
  password: Yup.string().required('Password is a required field!'),
});

export const checkoutSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('first name is required!')
    .min(3, 'first name must be 3 characters minimum'),
  lastName: Yup.string()
    .required('last name is required!')
    .min(3, 'last name must be 3 characters minimum'),
  email: Yup.string()
    .email('It should be a valid email')
    .required('email is required!'),
  phoneNumber: Yup.string()
    .required('phone number is required!')
    .matches(/^\d{8}$/, 'Phone number must be exactly 8 digits long'),
  paymentMethod: Yup.string().required('payment method is required!'),
  cardNumber: Yup.string()
    .required('card number is required!')
    .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, 'Invalid card number'),
  cardExpiryDate: Yup.string()
    .required('card expiry date is required!')
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      'Invalid expiry date format (MM/YY)',
    ),
  cardCVV: Yup.string()
    .required('Card Verification Value is required!')
    .matches(/^\d{3,4}$/, 'Invalid CVV'),
  requests: Yup.string(),
});

export const cityDialogSchema = Yup.object().shape({
  name: Yup.string().required('City name is a required field!'),
  description: Yup.string()
    .required('City description is a required field!')
    .min(3, 'Description should be at least 3 characters long'),
});

export const hotelDialogSchema = Yup.object().shape({
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

export const roomDialogSchema = Yup.object().shape({
  roomNumber: Yup.string().required('Room number is a required field!'),
  cost: Yup.number()
    .required('Cost is a required field!')
    .min(0, 'Room cost must be at least 0'),
});
