import React, { useContext, useState } from 'react';
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

  const [displayGETErrorMessage, setDisplayGETErrorMessage] = useState(false);
  const [displayWrongOriginAddress, setDisplayWrongOriginAddress] =
    useState(false);
  const [displayWrongDestinationAddress, setDisplayWrongDestinationAddress] =
    useState(false);

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
          streetNumber: Yup.number().typeError('Must be a number'),
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
          streetNumber: Yup.number().typeError('Must be a number'),
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

        Promise.all([originPromise, destinationPromise])
          .then(() => {
            setCurrentRoute([
              originAddressCoordinates,
              destinationAddressCoordinates,
            ]);

            addNewRoute([
              originAddressCoordinates,
              destinationAddressCoordinates,
            ]);

            if (originAddressCoordinates && destinationAddressCoordinates)
              navigate('/my-route');
            else {
              if (!originAddressCoordinates && !destinationAddressCoordinates) {
                setDisplayWrongOriginAddress(true);
                setDisplayWrongDestinationAddress(true);
              } else {
                if (originAddressCoordinates) {
                  setDisplayWrongDestinationAddress(true);
                } else {
                  setDisplayWrongOriginAddress(true);
                }
              }
            }
          })
          .catch(() => {
            setDisplayGETErrorMessage(true);
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
          {displayWrongOriginAddress && (
            <p className='error'>
              We can't find the origin address, try changing it
            </p>
          )}
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
          {displayWrongDestinationAddress && (
            <p className='error'>
              We can't find the destination address, try changing it
            </p>
          )}
        </div>

        {displayGETErrorMessage && (
          <p className='error'>Something went wrong, try again later</p>
        )}

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

export default AddressForm;
