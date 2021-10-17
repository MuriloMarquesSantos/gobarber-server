import { Router } from 'express';
import { parseISO } from 'date-fns';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';
import CreateAppointmentService from '../../services/CreateAppointmentService';
import AppointmentRepository from '../typeorm/repositories/AppointmentRepository';

const appoitmentsRouter = Router();

appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.get('/', async (_, response) => {
  const appointmentsRepository = new AppointmentRepository();
  const appointments = await appointmentsRepository.findAll();

  return response.json(appointments);
});

appoitmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    providerId,
  });
  return response.status(200).json(appointment);
});

export default appoitmentsRouter;
