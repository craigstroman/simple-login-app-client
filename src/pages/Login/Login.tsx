import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../validation/loginSchema';
import type { ILoginValues, iLoginResponseValues } from '../../shared/interfaces';
import { TogglePassword } from '../../components/TogglePassword/TogglePassword';
import { InputField } from '../../components/Inputfield/InputField';
import './Login.scss';

export const Login: React.FC = () => {
  const API_URL = 'http://localhost:9001';
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fieldType, setFieldType] = useState<string>('password');

  const initialValues: ILoginValues = {
    usernameOrEmail: '',
    password: '',
  };

  const handleToggleData = (data: string) => {
    setFieldType(data);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {errorMessage && errorMessage.length && <div className="form-error">{errorMessage}</div>}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          let response: any;
          try {
            setStatus('');
            response = await axios.post<iLoginResponseValues>(`${API_URL}/login`, values, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            });

            console.log('response.status: ', response.status);

            if (response.status === 200) {
              navigate('/dashboard');
            }
          } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Login failed');
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={loginSchema}
      >
        {({ errors, submitForm }) => {
          return (
            <Form>
              <div className="form-row">
                <InputField
                  name="usernameOrEmail"
                  placeholder="Enter a username or email"
                  fieldErrors={errors}
                />
              </div>

              <div className="form-row">
                <div className="password-input-container">
                  <InputField
                    name="password"
                    placeholder="Enter a password"
                    fieldErrors={errors}
                    type={fieldType}
                  />
                  <TogglePassword errors={errors} onSendValue={handleToggleData} />
                </div>
              </div>
              <div className="form-row">
                <button type="submit" className="button" onClick={submitForm}>
                  Login
                </button>
              </div>
              <div className="form-row">
                <a href="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </a>
                <br />
                <a href="/register" className="register-link">
                  Register
                </a>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
