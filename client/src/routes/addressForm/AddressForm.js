import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import './addressForm.scss';
import {
  allRoutesGeolocationsContext,
  addNewRouteContext,
} from '../../contexts/AllRoutesContext';
import axios from 'axios';
import { validationSchema } from './validationSchema';

function AddressForm() {
  const allRoutes = useContext(allRoutesGeolocationsContext);
  const addNewRoute = useContext(addNewRouteContext);

  const [displayGETErrorMessage, setDisplayGETErrorMessage] = useState('');

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
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
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const { origin, destination } = values;

        try {
          const response = await axios.post('http://localhost:3001/journey', {
            originAddress: origin,
            destinationAddress: destination,
          });

          const { origin: originData, destination: destinationData } =
            response.data;

          console.log(originData);
          console.log('====================');
          console.log(destinationData);

          addNewRoute({ origin: originData, destination: destinationData });
          navigate(`/route/${allRoutes.length}`);
        } catch (error) {
          console.log(error);
          setDisplayGETErrorMessage(
            error.response.data || 'something went wrong'
          );
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
