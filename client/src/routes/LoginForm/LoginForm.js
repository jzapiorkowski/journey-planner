import React, { useCallback, useEffect } from 'react';
import './loginForm.scss';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export default function LoginForm() {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    keycloak.authenticated && navigate('/user');
  }, [initialized, keycloak, navigate]);

  const handleLogin = useCallback(() => {
    keycloak.login();
  }, [keycloak]);

  const handleRegister = useCallback(() => {
    keycloak.register();
  }, [keycloak]);

  return (
    <div className='login-data'>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
