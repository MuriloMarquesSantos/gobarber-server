import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import ErrorMessages from '@shared/errors/ErrorMessages';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/appointments';
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentRepository';

interface Request {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError(ErrorMessages.APPOINTMENT_DUPLICATED, 409);
    }

    const appointment = await appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
