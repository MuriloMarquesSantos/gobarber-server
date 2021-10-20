import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { v4 as uuid } from 'uuid';

import { isEqual } from 'date-fns';

class AppointmentRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return Promise.resolve(foundAppointment);
  }

  public async findAll(): Promise<Appointment[]> {
    return Promise.resolve(this.appointments);
  }

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, providerId });

    this.appointments.push(appointment);

    return Promise.resolve(appointment);
  }
}

export default AppointmentRepository;
