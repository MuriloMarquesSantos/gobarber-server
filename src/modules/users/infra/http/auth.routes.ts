import { Router } from 'express';
import AuthenticateUserService from '../../services/AuthenticateUserService';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  console.log(request.body);
  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  return response.status(200).json({ user, token });
});

export default authRouter;
