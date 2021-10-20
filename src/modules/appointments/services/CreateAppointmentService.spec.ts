import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('Create Appointment', () => {
  const fakeAppointmentsRepository = new FakeAppointmentsRepository();
  const createAppointmentService = new CreateAppointmentService(
    fakeAppointmentsRepository,
  );
  it('Should be able to create a new appointment', async () => {
    const date = new Date();
    const createdAppointment = await createAppointmentService.execute({
      date,
      providerId: '123',
    });

    expect(createdAppointment).toHaveProperty('date');
    expect(createdAppointment.providerId).toBe('123');
  });
});
