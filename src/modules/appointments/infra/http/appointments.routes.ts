import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

import AppointmentController from './controllers/AppointmentController';

const appoitmentsRouter = Router();
const appointmentController = new AppointmentController();

appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.get('/', appointmentController.findAll);

appoitmentsRouter.post('/', appointmentController.create);

export default appoitmentsRouter;
