import React, { useCallback, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './loginForm.scss';
import axios from 'axios';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [loginError, setloginError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);

  const navigateToRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <div className='login-page'>
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={Yup.object({
          login: Yup.string().required('login is required'),
          password: Yup.string().required('password is required'),
        })}
        onSubmit={async ({ login, password }) => {
          try {
            if (location.pathname === '/login')
              await axios.post(`http://localhost:3001/login`, {
                params: {
                  login,
                  password,
                },
              });
            else
              await axios.post(`http://localhost:3001/register`, {
                params: {
                  login,
                  password,
                },
              });
          } catch (error) {
            console.log(error);
            setloginError(error.response.data || 'something went wrong');
          }
        }}
      >
        <Form className='login-form'>
          <label>Login</label>
          <Field name='login' />
          <ErrorMessage name='login' component='p' className='error' />
          <label>Password</label>
          <Field name='password' type='password' />
          <ErrorMessage name='password' component='p' className='error' />
          {loginError && <p className='error'>{loginError}</p>}
          <button type='submit'>Submit</button>
        </Form>
      </Formik>

      {location.pathname === '/login' && (
        <div className='register-area'>
          <p>Don't have an account yet?</p>
          <button onClick={navigateToRegister}>Register here</button>
        </div>
      )}
    </div>
  );
}
