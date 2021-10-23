/* eslint-disable no-unused-vars */
enum ErrorMessages {
  INTERNAL_ERROR = 'Internal Server Error',
  INCORRECT_PASSWORD = 'Incorrect email/password combination',
  APPOINTMENT_DUPLICATED = 'This appointment has already been booked',
  EMAIL_ALREADY_USED = 'Email address already used',
  SAVE_USER_ERROR = 'User already exists',
  USER_NOT_FOUND = 'User not found',
  USER_TOKEN_DOES_NOT_EXIST = 'User Token Does not Exist',
}

export default ErrorMessages;
