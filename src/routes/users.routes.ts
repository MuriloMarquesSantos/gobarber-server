import { Router } from 'express';
// import multer from 'multer';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import AppError from '../errors/AppError';
import User from '../models/user';
// import uploadConfig from '../config/upload';
// import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// const upload = multer(uploadConfig);
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
  return response.status(200).json(users);
});

// usersRouter.patch(
//   '/avatar',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   async (request, response) => {
//     const updateUserAvatarService = new UpdateUserAvatarService();

//     const user = await updateUserAvatarService.execute({
//       userId: request.user.id,
//       avatarFileName: request.file.filename,
//     });
//     return response.json(user);
//   },
// );
export default usersRouter;
