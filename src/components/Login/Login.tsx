import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { loginSchema } from '../../validation/loginSchema';
import type { LoginValues } from '../../shared/interfaces';

const Login = () => {
  const navigate = useNavigate();

  const initialValues: LoginValues = {
    emailOrUsername: '',
    password: '',
  };

  return (
    <div className="auth-container">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            setStatus('');

            await login(values);

            navigate('/dashboard', { replace: true });
          } catch (error) {
            setStatus(error instanceof Error ? error.message : 'Login failed');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="auth-form">
            <h1>Login</h1>
            <label htmlFor="emailOrUsername">Username or Email</label>
            <Field id="emailOrUsername" name="emailOrUsername" type="text" />
            <ErrorMessage name="emailOrUsername" component="div" className="error" />w
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />
            {status && (
              <div className="error" role="alert">
                {status}
              </div>
            )}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
