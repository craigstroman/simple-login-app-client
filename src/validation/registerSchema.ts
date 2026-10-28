import * as Yup from 'yup';

export const registerSchema = Yup.object({
  firstName: Yup.string().required('First name is required.'),
  lastName: Yup.string().required('Last name is required.'),
  email: Yup.string().email('Enter a valid email.').required('Email is required.'),
  username: Yup.string().required('Username is required.'),
  password: Yup.string()
    .required('Password is required.')
    .min(6, 'Password must be at least 6 characters long.')
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, 'Password must special characters.'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required.')
    .oneOf([Yup.ref('password')], 'Passwords must match.'),
});
