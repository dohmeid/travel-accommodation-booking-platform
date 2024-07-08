import * as Yup from 'yup';

// the yup module schema for validating the login form
export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is a required field!"),
  password: Yup.string().required("Password is a required field!"),
});

export const initialLoginValues = {
  username: "",
  password: "",
};
