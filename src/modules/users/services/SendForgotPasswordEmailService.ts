import { inject, injectable } from 'tsyringe';
import IEmailProvider from '@shared/providers/MailProvider/models/IEmailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;

  private emailProvider: IEmailProvider;

  private userTokensRepository: IUserTokensRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('EmailProvider')
    emailProvider: IEmailProvider,

    @inject('UserTokensRepository')
    userTokensRepository: IUserTokensRepository,
  ) {
    this.usersRepository = usersRepository;
    this.emailProvider = emailProvider;
    this.userTokensRepository = userTokensRepository;
  }

  public async execute({ email }: IRequest): Promise<void> {
    const foundUser = await this.usersRepository.findByEmail(email);

    if (!foundUser) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, 404);
    }

    await this.userTokensRepository.generate(foundUser.id);

    this.emailProvider.sendEmail(email, 'Pedido recebido');
  }
}

export default SendForgotPasswordEmailService;
