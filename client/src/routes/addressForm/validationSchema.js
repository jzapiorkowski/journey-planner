import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
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
});
