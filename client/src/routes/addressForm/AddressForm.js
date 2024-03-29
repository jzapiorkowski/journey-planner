import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import './addressForm.scss';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';
import { validationSchema } from './validationSchema';

function AddressForm() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.routeId;
  const [displayGETErrorMessage, setDisplayGETErrorMessage] = useState('');
  const [journeyData, setJourneyData] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { keycloak, initialized } = useKeycloak();

  const getJourney = useCallback(async () => {
    if (id) {
      setIsLoading(true);
      try {
        const { preferred_username: login } = keycloak.tokenParsed;

        const { data } = await axios.get(
          `http://localhost:3001/journey/${id}`,
          {
            headers: { Authorization: `Bearer ${keycloak.token}` },
            params: { login },
          }
        );

        setJourneyData({
          origin: data.origin.address,
          destination: data.destination.address,
        });
        setIsLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/login');
        }

        setFetchError(error?.response?.data || 'something went wrong');
      }
    } else {
      setJourneyData({
        origin: {
          country: '',
          city: '',
          street: '',
          streetNumber: '',
        },
        destination: {
          country: '',
          city: '',
          street: '',
          streetNumber: '',
        },
      });
    }
  }, [id, keycloak.token, keycloak.tokenParsed, navigate]);

  useEffect(() => {
    if (initialized) {
      if (keycloak.authenticated) {
        if (keycloak.hasRealmRole('journeys')) getJourney();
        else setFetchError('Access denied');
      } else {
        navigate('/login');
      }
    }
  }, [getJourney, initialized, keycloak, navigate]);

  if (fetchError) {
    return <h1>{fetchError}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Formik
      initialValues={journeyData}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const { origin, destination } = values;

        if (id) {
          try {
            const { preferred_username: login } = keycloak.tokenParsed;

            const response = await axios.put(
              `http://localhost:3001/journey/${id}`,
              {
                originAddress: origin,
                destinationAddress: destination,
              },
              {
                headers: { Authorization: `Bearer ${keycloak.token}` },
                params: { login },
              }
            );

            const { id: journeyId } = response.data;

            navigate(`/route/${journeyId}`);
          } catch (error) {
            setDisplayGETErrorMessage(
              error.response.data || 'something went wrong'
            );
          }
        } else {
          try {
            const { preferred_username: login } = keycloak.tokenParsed;

            const response = await axios.post(
              'http://localhost:3001/journey',
              {
                originAddress: origin,
                destinationAddress: destination,
              },
              {
                headers: { Authorization: `Bearer ${keycloak.token}` },
                params: { login },
              }
            );

            const { id } = response.data;

            navigate(`/route/${id}`);
          } catch (error) {
            setDisplayGETErrorMessage(
              error.response.data || 'something went wrong'
            );
          }
        }
      }}
    >
      <Form>
        <div className='address-form' id='origin'>
          <h2>Origin Address</h2>

          <label htmlFor='country'>Country</label>
          <Field name='origin.country' type='text' />
          <ErrorMessage name='origin.country' component='p' className='error' />

          <label htmlFor='city'>City</label>
          <Field name='origin.city' type='text' />
          <ErrorMessage name='origin.city' component='p' className='error' />

          <label htmlFor='street'>Street</label>
          <Field name='origin.street' type='text' />
          <ErrorMessage name='origin.street' component='p' className='error' />

          <label htmlFor='streetNumber'>Street Number</label>
          <Field name='origin.streetNumber' type='text' />
          <ErrorMessage
            name='origin.streetNumber'
            component='p'
            className='error'
          />
        </div>

        <div className='address-form' id='destination'>
          <h2>Destination Address</h2>

          <label htmlFor='country'>Country</label>
          <Field name='destination.country' type='text' />
          <ErrorMessage
            name='destination.country'
            component='p'
            className='error'
          />

          <label htmlFor='city'>City</label>
          <Field name='destination.city' type='text' />
          <ErrorMessage
            name='destination.city'
            component='p'
            className='error'
          />

          <label htmlFor='street'>Street</label>
          <Field name='destination.street' type='text' />
          <ErrorMessage
            name='destination.street'
            component='p'
            className='error'
          />

          <label htmlFor='streetNumber'>Street Number</label>
          <Field name='destination.streetNumber' type='text' />
          <ErrorMessage
            name='destination.streetNumber'
            component='p'
            className='error'
          />
        </div>

        {displayGETErrorMessage && (
          <p className='error'>{displayGETErrorMessage}</p>
        )}

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

export default AddressForm;
