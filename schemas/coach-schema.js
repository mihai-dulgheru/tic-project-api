const yup = require('yup');

module.exports = yup.object().shape({
  areas: yup
    .array()
    .of(yup.string().oneOf(['frontend', 'backend', 'career']))
    .min(1)
    .max(3)
    .required()
    .label('Areas'),
  description: yup.string().required().label('Description'),
  email: yup.string().email().label('Email'),
  firstName: yup.string().required().label('First Name'),
  hourlyRate: yup.number().min(10).max(100).required().label('Hourly Rate'),
  lastName: yup.string().required().label('Last Name'),
});
