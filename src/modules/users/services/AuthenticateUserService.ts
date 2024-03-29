import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import ErrorMessages from '@shared/errors/ErrorMessages';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import AuthenticateUserRequest from '../dtos/AuthenticateUserRequest';
import AuthenticateUserResponse from '../dtos/AuthenticateUserResponse';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/user';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  defaultError = new AppError(ErrorMessages.INCORRECT_PASSWORD, 401);

  public async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const foundUser = await this.getUserByEmail(email);
    await this.comparePasswords(password, foundUser.password);
    const token = this.generateToken(foundUser.id);

    return {
      user: foundUser.toUserResponse(),
      token,
    };
  }

  private async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw this.defaultError;
    }

    return user;
  }

  private async comparePasswords(givenPassword: string, userPassword: string) {
    const passwordMatched = await this.hashProvider.compareHash(
      givenPassword,
      userPassword,
    );

    if (!passwordMatched) {
      throw this.defaultError;
    }
  }

  private generateToken(userId: string) {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: userId,
      expiresIn,
    });

    return token;
  }
}

export default AuthenticateUserService;
