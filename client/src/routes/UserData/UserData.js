import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './userData.scss';

function UserData() {
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/user', {
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

        setFetchError(error.response.data || 'something went wrong');
      }
    };

    getUserData();
  }, [navigate]);

  if (fetchError) {
    return <h1>{fetchError}</h1>;
  }

  return (
    <div className='user-data'>
      <h1>You're logged in as:</h1>
      <h2>{userData.login}</h2>
    </div>
  );
}

export default UserData;
