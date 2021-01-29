import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  try {
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    return response.status(200).json({ user, token });
  } catch (error) {
    return response.status(error.statusCode).json({ message: error.message });
  }
});

export default authRouter;
