export interface ValidationErrors {
  [key: string]: string;
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isDigitsOnly = (value: string) => /^\d+$/.test(value);

export function validateLoginForm(form: { email: string; password: string }): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address';

  if (!form.password) errors.password = 'Password is required';
  else if (form.password.length < 8) errors.password = 'Minimum 8 characters required';

  return errors;
}

export function validateRegisterStep1(
  form: {
    username: string;
    email: string;
    password: string;
  },
  agreed: boolean
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!form.username.trim()) errors.username = 'Username is required';

  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address';

  if (!form.password) errors.password = 'Password is required';
  else if (form.password.length < 8) errors.password = 'Minimum 8 characters required';

  if (!agreed) errors.agreed = 'You must accept terms to continue';

  return errors;
}

export function validateRegisterStep2(form: {
  fullname: string;
  phoneNumber: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!form.fullname.trim()) errors.fullname = 'Full name is required';

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!isDigitsOnly(form.phoneNumber) || form.phoneNumber.length < 10) {
    errors.phoneNumber = 'Enter a valid phone number';
  }

  return errors;
}

export function validateRegisterStep3(form: {
  address: string;
  city: string;
  state: string;
  pincode: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!form.address.trim()) errors.address = 'Address is required';
  if (!form.city.trim()) errors.city = 'City is required';
  if (!form.state.trim()) errors.state = 'State is required';

  if (!form.pincode.trim()) {
    errors.pincode = 'Pincode is required';
  } else if (!isDigitsOnly(form.pincode) || form.pincode.length < 4) {
    errors.pincode = 'Enter a valid pincode';
  }

  return errors;
}
