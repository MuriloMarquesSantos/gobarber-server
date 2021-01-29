/* eslint-disable no-unused-vars */
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AuthenticateUserRequest from '../dto/AuthenticateUserRequest';
import AuthenticateUserResponse from '../dto/AuthenticateUserResponse';
import authConfig from '../config/auth';
import ErrorMessages from '../errors/ErrorMessages';
import AppError from '../errors/AppError';

import User from '../models/user';

class AuthenticateUserService {
  usersRepository = getRepository(User);

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
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw this.defaultError;
    }

    return user;
  }

  private async comparePasswords(givenPassword: string, userPassword: string) {
    const passwordMatched = await compare(givenPassword, userPassword);

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
