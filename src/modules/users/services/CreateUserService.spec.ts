import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('Should create user correctly', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = await createUserService.execute({
      name: 'aUser',
      email: 'another@gmail.com',
      password: 'root',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
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
