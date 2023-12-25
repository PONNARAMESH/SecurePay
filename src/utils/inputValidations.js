/*-------------------------------------------------------------------
|  🐼 Input Validators
|
|  🐯 Purpose: THIS FILE CONTAINS ALL THE VALIDATORS OBJECTS
|
|  🐸 Returns:  -
*-------------------------------------------------------------------*/

export const name_validation = {
  name: 'name',
  label: 'name',
  type: 'text',
  id: 'name',
  placeholder: 'Ex: John',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
};

export const password_validation = {
  name: 'Password',
  label: 'Password',
  type: 'password',
  id: 'password',
  placeholder: 'Ex: joch12!',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 6,
      message: 'min 6 characters',
    },
    pattern: {
      value: /[a-z0-9]/, //TODO: later have to update this RegEx for strict validations
      message: 'not valid',
    },
  },
};

export const confirm_password_validation = {
  name: 'Confirm Password',
  label: 'Confirm Password',
  type: 'password',
  id: 'confirmPassword',
  placeholder: 'Ex: joch12!',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 6,
      message: 'min 6 characters',
    },
    pattern: {
      value: /[a-z0-9]/, //TODO: later have to update this RegEx for strict validations
      message: 'not valid',
    },
  },
};

export const email_validation = {
  name: 'Email Id',
  label: 'Email address',
  type: 'email',
  id: 'emailId',
  placeholder: 'Ex: john@gmail.com',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'not valid',
    },
  },
};
