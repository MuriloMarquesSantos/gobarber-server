import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';

import AppError from '../errors/AppError';
import User from '../models/user';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const upload = multer(uploadConfig);
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const createdUser = await createUserService.execute({
      name,
      email,
      password,
    });
    return response.status(201).json(createdUser);
  } catch (error) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }
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
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();
      const userResponse = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      return response.status(200).json(userResponse);
    } catch (error) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }
  },
);

export default usersRouter;
