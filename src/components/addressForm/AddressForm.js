import React from 'react';
import { Formik, Form, Field } from 'formik';

function AddressForm() {
  return (
    <Formik
      initialValues={{
        country: '',
        city: '',
        street: '',
        streetNumber: null || '',
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor='country'>Country</label>
        <Field name='country' type='text' />

        <label htmlFor='city'>City</label>
        <Field name='city' type='text' />

        <label htmlFor='street'>Street</label>
        <Field name='street' type='text' />

        <label htmlFor='streetNumber'>Street Number</label>
        <Field name='streetNumber' type='text' />

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

export default AddressForm;
