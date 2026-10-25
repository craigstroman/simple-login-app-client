import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { registerSchema } from '../../validation/registerSchema';
import type { RegisterValues } from '../../shared/interfaces';

const Register = () => {
  const navigate = useNavigate();

  const initialValues: RegisterValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <div className="auth-container">
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            setStatus('');

            await register(values);

            navigate('/login', { replace: true });
          } catch (error) {
            setStatus(error instanceof Error ? error.message : 'Registration failed');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="auth-form">
            <h1>Register</h1>

            {[
              ['firstName', 'First Name', 'text'],
              ['lastName', 'Last Name', 'text'],
              ['username', 'Username', 'text'],
              ['email', 'Email', 'email'],
              ['password', 'Password', 'password'],
              ['confirmPassword', 'Confirm Password', 'password'],
            ].map(([name, label, type]) => (
              <div className="form-field" key={name}>
                <label htmlFor={name}>{label}</label>

                <Field id={name} name={name} type={type} />

                <ErrorMessage name={name} component="div" className="error" />
              </div>
            ))}

            {status && (
              <div className="error" role="alert">
                {status}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
