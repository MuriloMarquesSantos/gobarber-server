import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import UsersController from './controllers/UsersController';
import UserAvatarController from './controllers/UserAvatarController';

const upload = multer(uploadConfig);
const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.get('/', usersController.findAll);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
