import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './loginForm.scss';
import axios from 'axios';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export default function LoginForm() {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(keycloak.authenticated, 'authenticated');
    console.log(initialized, 'initialized');

    keycloak.authenticated && navigate('/user');
    // !keycloak.authenticated && keycloak.login();
    // !keycloak.authenticated ? keycloak.login() : navigate('/user');4

    keycloak.onAuthSuccess = () => {
      console.log('User authenticated');
      console.log('Is authenticated:', keycloak.authenticated);
    };

    // Clean up the event listener when component unmounts
    return () => {
      keycloak.onAuthSuccess = null;
    };
  }, [initialized, keycloak, navigate]);

  const handleLogin = useCallback(() => {
    keycloak.login();
  }, [keycloak]);

  const handleRegister = useCallback(() => {
    keycloak.register();
  }, [keycloak]);

  // if (!initialized) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </>
  );
  // const [loginError, setloginError] = useState(null);
  // const location = useLocation();
  // const navigate = useNavigate();

  // const navigateToRegister = useCallback(() => {
  //   navigate('/register');
  // }, [navigate]);

  // sessionStorage.getItem('auth-token');

  // return (
  //   <div className='login-page'>
  //     <Formik
  //       initialValues={{
  //         login: '',
  //         password: '',
  //       }}
  //       validationSchema={Yup.object({
  //         login: Yup.string().required('login is required'),
  //         password: Yup.string().required('password is required'),
  //       })}
  //       onSubmit={async ({ login, password }) => {
  //         try {
  //           if (location.pathname === '/login') {
  //             const {
  //               data: { token },
  //             } = await axios.post(`https://localhost:3001/login`, {
  //               login,
  //               password,
  //             });

  //             sessionStorage.setItem('auth-token', token);
  //             navigate('/user');
  //           } else {
  //             const {
  //               data: { token },
  //             } = await axios.post(`https://localhost:3001/register`, {
  //               login,
  //               password,
  //             });

  //             sessionStorage.setItem('auth-token', token);
  //             navigate('/user');
  //           }
  //         } catch (error) {
  //           setloginError(
  //             error?.response?.data?.message || 'something went wrong'
  //           );
  //         }
  //       }}
  //     >
  //       <Form className='login-form'>
  //         <label>Login</label>
  //         <Field name='login' />
  //         <ErrorMessage name='login' component='p' className='error' />
  //         <label>Password</label>
  //         <Field name='password' type='password' />
  //         <ErrorMessage name='password' component='p' className='error' />
  //         {loginError && <p className='error'>{loginError}</p>}
  //         <button type='submit'>Submit</button>
  //       </Form>
  //     </Formik>

  //     {location.pathname === '/login' && (
  //       <div className='register-area'>
  //         <p>Don't have an account yet?</p>
  //         <button onClick={navigateToRegister}>Register here</button>
  //       </div>
  //     )}
  //   </div>
  // );
}
