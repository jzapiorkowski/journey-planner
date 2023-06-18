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
  const [allJourneysCount, setAllJourneysCount] = useState(0);
  const [Loading, setLoading] = useState(false);

  const getAllJourneys = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3001/alljourneys', {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });
      setAllJourneysCount(data.length);
      setLoading(false);
    } catch (error) {
      setFetchError(error?.response?.data || 'something went wrong');
      setLoading(false);
    }
  }, [keycloak.token]);

  useEffect(() => {
    console.log(initialized, 'initialized');
    console.log(keycloak.authenticated, 'authenticated');
    if (initialized) {
      if (!keycloak.authenticated) {
        navigate('/login');
      } else {
        const { name } = keycloak.tokenParsed;
        setUserData({ name });
      }
    }
  }, [initialized, keycloak.authenticated, keycloak.tokenParsed, navigate]);

  useEffect(() => {
    if (
      initialized &&
      keycloak.authenticated &&
      keycloak.hasRealmRole('admin')
    ) {
      getAllJourneys();
    }
  }, [getAllJourneys, initialized, keycloak]);

  const handleLogout = useCallback(() => keycloak.logout(), [keycloak]);

  if (fetchError) {
    return <h1>{fetchError}</h1>;
  }

  if (Loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='user-data'>
      <h1>You're logged in as:</h1>
      <h2>{userData.name}</h2>
      {keycloak.hasRealmRole('admin') && (
        <>
          <p>Wow, you're an admin!</p>
          <p>There are {allJourneysCount} route searches in total</p>
        </>
      )}
      <button onClick={() => keycloak.accountManagement()}>
        manage account
      </button>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default UserData;
