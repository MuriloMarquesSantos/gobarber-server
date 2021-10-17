import { Router } from 'express';
import AuthenticateUserService from '../../services/AuthenticateUserService';
import UsersRepository from '../typeorm/repositories/UsersRepository';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;
  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  return response.status(200).json({ user, token });
});

export default authRouter;
