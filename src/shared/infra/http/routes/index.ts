/* eslint-disable no-console */
import express, { Router } from 'express';

import usersRouter from '@modules/users/infra/http/users.routes';
import appointmentsRouter from '@modules/appointments/infra/http/appointments.routes';
import authRouter from '@modules/users/infra/http/auth.routes';

const routes = Router();
routes.use(express.json());

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/token', authRouter);

export default routes;
