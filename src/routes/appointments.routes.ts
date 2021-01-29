import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentRepository';
import Appointment from '../models/appointments';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appoitmentsRouter = Router();

// appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appoitmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  try {
    const appointment = await createAppointment.execute({
      date: parsedDate,
      providerId,
    });
    return response.status(200).json(appointment);
  } catch (error) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }
});

export default appoitmentsRouter;
