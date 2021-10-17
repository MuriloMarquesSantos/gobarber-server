import { startOfHour } from 'date-fns';
import ErrorMessages from '@shared/errors/ErrorMessages';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/appointments';
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: IAppointmentsRepository;

  constructor(repository: IAppointmentsRepository) {
    this.appointmentsRepository = repository;
  }

  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError(ErrorMessages.APPOINTMENT_DUPLICATED, 409);
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
