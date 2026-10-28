import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { InputField } from '../../components/Inputfield/InputField';
import { TogglePassword } from '../../components/TogglePassword/TogglePassword';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { registerSchema } from '../../validation/registerSchema';
import type { IRegisterFormValues } from '../../shared/interfaces';
import './Register.scss';

export const Register = () => {
  const navigate = useNavigate();
  const [passwordFieldType, setPasswordFieldType] = useState<string>('password');
  const [passwordConfirmationFieldType, setPasswordConfirmationFieldType] = useState<string>('password');
  const initialValues: IRegisterFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const handleToggleData = (fieldName: string) => {
    if (fieldName === 'password') {
      if (passwordFieldType === 'password') {
        setPasswordFieldType('text');
      } else {
        setPasswordFieldType('password');
      }
    } else if (fieldName === 'password_confirmation') {
      if (passwordConfirmationFieldType === 'password') {
        setPasswordConfirmationFieldType('text');
      } else {
        setPasswordConfirmationFieldType('password');
      }
    }
  };
  return (
    <div className="register-container">
      <h1>Register a new account</h1>
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
        {({ isSubmitting, status, errors }) => (
          <Form className="auth-form">
            <h1>Register</h1>
            <div className="form-row">
              <InputField name="firstName" placeholder="Enter a first name" fieldErrors={errors} />
            </div>

            <div className="form-row">
              <InputField name="lastName" placeholder="Enter a last name" fieldErrors={errors} />
            </div>

            <div className="form-row">
              <InputField
                name="email"
                placeholder="Enter a first email address"
                fieldErrors={errors}
                type="email
                  "
              />
            </div>

            <div className="form-row">
              <InputField name="username" placeholder="Enter a username" fieldErrors={errors} />
            </div>

            <div className="form-row">
              <div className="password-input-container">
                <InputField
                  name="password"
                  placeholder="Enter a password"
                  fieldErrors={errors}
                  type={passwordFieldType}
                />
                <TogglePassword errors={errors} onSendValue={() => handleToggleData('password')} />
              </div>
            </div>

            <div className="form-row">
              <div className="password-input-container">
                <InputField
                  name="password_confirmation"
                  placeholder="Enter password confirmation"
                  fieldErrors={errors}
                  type={passwordConfirmationFieldType}
                />
                <TogglePassword
                  errors={errors}
                  onSendValue={() => handleToggleData('password_confirmation')}
                />
              </div>
            </div>

            <div className="form-row">
              <button type="submit" className="button">
                Register
              </button>
            </div>
            {status && (
              <div className="error" role="alert">
                {status}
              </div>
            )}
          </Form>
        )}
      </Formik>
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
