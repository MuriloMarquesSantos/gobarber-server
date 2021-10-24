import { Router } from 'express';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot-password', forgotPasswordController.create);
passwordRouter.post('/reset-password', resetPasswordController.create);

export default passwordRouter;
