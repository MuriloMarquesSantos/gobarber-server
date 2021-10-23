import FakeEmailProvider from '@shared/providers/MailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeEmailProvider: FakeEmailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeEmailProvider = new FakeEmailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
      fakeUserTokensRepository,
    );
  });
  it('Should be able to retrieve the password using the email', async () => {
    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');

    await fakeUsersRepository.create({
      email: 'Johndoe@gmail.com',
      name: 'John Doe',
      password: '123',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'Johndoe@gmail.com',
    });

    expect(sendEmail).toHaveBeenCalledTimes(1);
  });

  it('Should not be able to retrieve the password using the email given the user does not exist', async () => {
    expect(
      sendForgotPasswordEmailService.execute({
        email: 'Johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a forgot password token', async () => {
    const generateFunction = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      email: 'Johndoe@gmail.com',
      name: 'John Doe',
      password: '123',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'Johndoe@gmail.com',
    });

    expect(generateFunction).toHaveBeenCalledWith(user.id);
  });
});
