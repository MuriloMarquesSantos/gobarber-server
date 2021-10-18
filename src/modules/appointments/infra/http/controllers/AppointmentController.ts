import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentRepository from '../../typeorm/repositories/AppointmentRepository';

class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      providerId,
    });
    return response.status(200).json(appointment);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const appointmentsRepository = new AppointmentRepository();
    const appointments = await appointmentsRepository.findAll();

    return response.json(appointments);
  }
}

export default AppointmentController;
