import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import AuthenticateUserRequest from '../dto/AuthenticateUserRequest';

import User from '../models/User';

class AuthenticateUserService {
  usersRepository = getRepository(User);

  defaultError = new Error('Incorrect email/password combination');

  public async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<void> {
    const foundUser = await this.getUserByEmail(email);
    await this.comparePasswords(password, foundUser.password);
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
}

export default AuthenticateUserService;
