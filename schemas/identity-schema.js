const yup = require('yup');

module.exports = yup.object().shape({
  password: yup.string().trim().required().label('Password'),
  confirmPassword: yup.string().trim().required().label('Confirm Password'),
});
