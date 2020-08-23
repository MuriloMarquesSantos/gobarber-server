// eslint-disable-next-line no-unused-vars
import UserResponse from './UserResponse';

interface AuthenticateUserResponse {
  user: UserResponse;
  token: string;
}

export default AuthenticateUserResponse;
