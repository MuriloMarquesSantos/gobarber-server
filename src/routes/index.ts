/* eslint-disable no-console */
import express, { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();
routes.use(express.json());

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
