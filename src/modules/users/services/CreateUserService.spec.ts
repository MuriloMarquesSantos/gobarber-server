import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('Should create user correctly', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);
    const user = await createUserService.execute({
      name: 'aUser',
      email: 'another@gmail.com',
      password: 'root',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);
    await createUserService.execute({
      name: 'aUser',
      email: 'another@gmail.com',
      password: 'root',
    });

    expect(
      createUserService.execute({
        name: 'aUser',
        email: 'another@gmail.com',
        password: 'root',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
