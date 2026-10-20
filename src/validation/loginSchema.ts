import * as Yup from 'yup';

export const loginSchema = Yup.object({
  emailOrUsername: Yup.string().trim().required('Username or email is required'),

  password: Yup.string().required('Password is required'),
});
