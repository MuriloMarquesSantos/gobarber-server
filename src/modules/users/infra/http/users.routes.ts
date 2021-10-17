import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';

import User from '@modules/users/infra/entities/user';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

const upload = multer(uploadConfig);
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const createdUser = await createUserService.execute({
    name,
    email,
    password,
  });
  return response.status(201).json(createdUser);
});

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();
  const usersResponse = users.map(user => user.toUserResponse());

  return response.status(200).json(usersResponse);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();
    const userResponse = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.status(200).json(userResponse);
  },
);

export default usersRouter;
