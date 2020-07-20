import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentRepository';
import Appointment from '../models/Appointment';

const appoitmentsRouter = Router();

appoitmentsRouter.get('/', (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = appointmentsRepository.find();

  return response.json(appointments);
});

appoitmentsRouter.post('/', async (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  try {
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });
    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default appoitmentsRouter;
