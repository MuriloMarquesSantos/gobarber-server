import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const createdUser = await createUserService.execute({
    name,
    email,
    password,
  });

  return response.status(200).json(createdUser);
});
export default usersRouter;
