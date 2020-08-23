/* eslint-disable no-unused-vars */
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import AuthenticateUserRequest from '../dto/AuthenticateUserRequest';
import AuthenticateUserResponse from '../dto/AuthenticateUserResponse';

import User from '../models/User';

class AuthenticateUserService {
  usersRepository = getRepository(User);

  defaultError = new Error('Incorrect email/password combination');

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
    const token = sign({}, '9b923efebd05903047eed48a0e093e33', {
      subject: userId,
      expiresIn: '1d',
    });

    return token;
  }
}

export default AuthenticateUserService;
