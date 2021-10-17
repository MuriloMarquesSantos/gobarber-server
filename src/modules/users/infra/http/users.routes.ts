import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import UsersRepository from '../typeorm/repositories/UsersRepository';

const upload = multer(uploadConfig);
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService(usersRepository);

  const createdUser = await createUserService.execute({
    name,
    email,
    password,
  });
  return response.status(201).json(createdUser);
});

usersRouter.get('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const users = await usersRepository.findAll();
  const usersResponse = users.map(user => user.toUserResponse());

  return response.status(200).json(usersResponse);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository,
    );
    const userResponse = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.status(200).json(userResponse);
  },
);

export default usersRouter;
