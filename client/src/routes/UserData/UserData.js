import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './userData.scss';
import { useKeycloak } from '@react-keycloak/web';

function UserData() {
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [userData, setUserData] = useState({});
  const { keycloak, initialized } = useKeycloak();

  const getUserData = useCallback(async () => {
    try {
      const { data } = await axios.get('https://localhost:3001/user', {
        headers: {
          'auth-token': sessionStorage.getItem('auth-token'),
        },
      });
      setUserData({ ...data });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        navigate('/login');
      }
      setFetchError(error?.response?.data || 'something went wrong');
    }
  }, [navigate]);

  // useEffect(() => {
  //   if (initialized) {
  //     if (!keycloak.authenticated) {
  //       navigate('/login');
  //     } else {
  //       getUserData();
  //     }
  //   }
  // }, [getUserData, initialized, keycloak.authenticated, navigate]);

  useEffect(() => {
    console.log(keycloak.authenticated, 'authenticated');
    console.log(initialized, 'initialized');

    const x = keycloak.tokenParsed;
    console.log(x);
  }, [initialized, keycloak.authenticated, keycloak.tokenParsed, navigate]);

  const handleLogout = useCallback(() => keycloak.logout(), [keycloak]);

  if (fetchError) {
    return <h1>{fetchError}</h1>;
  }

  return (
    <div className='user-data'>
      <h1>You're logged in as:</h1>
      <h2>{userData.login}</h2>
      <button onClick={() => keycloak.accountManagement()}>
        manage account
      </button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default UserData;
