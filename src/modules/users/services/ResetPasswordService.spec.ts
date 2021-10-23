import FakeEmailProvider from '@shared/providers/MailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'Johndoe@gmail.com',
      name: 'John Doe',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token: userToken.token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(updatedUser?.password).toBe('123123');
    expect(generateHash).toHaveBeenCalledWith('123123');
  });

  it('Should throw error given token does not exist', async () => {
    await fakeUsersRepository.create({
      email: 'Johndoe@gmail.com',
      name: 'John Doe',
      password: '123456',
    });

    expect(
      resetPasswordService.execute({
        password: '123123',
        token: '132',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error given user does not exist', async () => {
    const userToken = await fakeUserTokensRepository.generate('123');

    expect(
      resetPasswordService.execute({
        password: '123123',
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should throw error given more than hours have passed', async () => {
    const user = await fakeUsersRepository.create({
      email: 'Johndoe@gmail.com',
      name: 'John Doe',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });
    expect(
      resetPasswordService.execute({
        password: '123123',
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
