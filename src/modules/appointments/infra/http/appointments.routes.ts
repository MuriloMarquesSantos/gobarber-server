import { Router } from 'express';
import { parseISO } from 'date-fns';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import CreateAppointmentService from '../../services/CreateAppointmentService';
import AppointmentRepository from '../typeorm/repositories/AppointmentRepository';

const appoitmentsRouter = Router();

const appointmentsRepository = new AppointmentRepository();

appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.get('/', async (_, response) => {
  const appointments = await appointmentsRepository.findAll();

  return response.json(appointments);
});

appoitmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    date: parsedDate,
    providerId,
  });
  return response.status(200).json(appointment);
});

export default appoitmentsRouter;
