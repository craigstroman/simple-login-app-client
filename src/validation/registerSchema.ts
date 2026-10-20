import * as Yup from 'yup';

export const registerSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),

  lastName: Yup.string().trim().required('Last name is required'),

  username: Yup.string()
    .trim()
    .min(3, 'Username must have at least 3 characters')
    .required('Username is required'),

  email: Yup.string().trim().email('Invalid email address').required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must have at least 8 characters')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Must contain at least one special character')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});
