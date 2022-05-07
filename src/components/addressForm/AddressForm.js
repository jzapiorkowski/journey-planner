import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ForwardGeocode from '../../utils/ForwardGeocode';
import { setCurrentRouteContext } from '../../contexts/CurrentRouteContext';
import { useNavigate } from 'react-router-dom';
import { addNewRouteContext } from '../../contexts/AllRoutesContext';
import './addressForm.scss';
import * as Yup from 'yup';

function AddressForm() {
  const setCurrentRoute = useContext(setCurrentRouteContext);
  const addNewRoute = useContext(addNewRouteContext);

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
      validationSchema={Yup.object().shape({
        origin: Yup.object({
          country: Yup.string()
            .required('Required')
            .max(30, 'Must be 30 characters or less'),
          city: Yup.string()
            .required('Required')
            .max(30, 'Must be 30 characters or less'),
          street: Yup.string()
            .required('Required')
            .max(30, 'Must be 30 characters or less'),
          streetNumber: Yup.number()
            .typeError('Must be a number')
            .max(30, 'Must be 30 characters or less'),
        }),
        destination: Yup.object({
          country: Yup.string()
            .required('Required')
            .max(30, 'Must be 30 characters or less'),
          city: Yup.string()
            .required('Required')
            .max(30, 'Must be 30 characters or less'),
          street: Yup.string()
            .required('Required')
            .max(30, 'Must be 30 characters or less'),
          streetNumber: Yup.number()
            .typeError('Must be a number')
            .max(30, 'Must be 30 characters or less'),
        }),
      })}
      onSubmit={(values) => {
        let originAddressCoordinates;
        let destinationAddressCoordinates;

        const originPromise = ForwardGeocode(values.origin).then(
          (resolvedAddress) => {
            originAddressCoordinates = resolvedAddress;
          }
        );
        const destinationPromise = ForwardGeocode(values.destination).then(
          (resolvedAddress) => {
            destinationAddressCoordinates = resolvedAddress;
          }
        );
        Promise.all([originPromise, destinationPromise]).then(() => {
          console.log(originAddressCoordinates, destinationAddressCoordinates);
          setCurrentRoute([
            originAddressCoordinates,
            destinationAddressCoordinates,
          ]);
          addNewRoute([
            originAddressCoordinates,
            destinationAddressCoordinates,
          ]);
          navigate('/my-route');
        });
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

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

export default AddressForm;
