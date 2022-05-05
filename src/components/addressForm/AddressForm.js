import React from 'react';
import { Formik, Form, Field } from 'formik';

function AddressForm() {
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
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <h5>Origin Address</h5>
        <label htmlFor='country'>Country</label>
        <Field name='origin.country' type='text' />

        <label htmlFor='city'>City</label>
        <Field name='origin.city' type='text' />

        <label htmlFor='street'>Street</label>
        <Field name='origin.street' type='text' />

        <label htmlFor='streetNumber'>Street Number</label>
        <Field name='origin.streetNumber' type='text' />

        <h5>Destination Address</h5>
        <label htmlFor='country'>Country</label>
        <Field name='destination.country' type='text' />

        <label htmlFor='city'>City</label>
        <Field name='destination.city' type='text' />

        <label htmlFor='street'>Street</label>
        <Field name='destination.street' type='text' />

        <label htmlFor='streetNumber'>Street Number</label>
        <Field name='destination.streetNumber' type='text' />

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

export default AddressForm;
