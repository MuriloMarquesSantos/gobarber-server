import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { check } from 'prettier';
import User from '../models/user';
import CreateUserRequest from '../dto/CreateUserRequest';
import UserResponse from '../dto/UserResponse';
import AppError from '../errors/AppError';
import ErrorMessages from '../errors/ErrorMessages';

class CreateUserService {
  usersRepository = getRepository(User);

  async execute({ name, email, password }: CreateUserRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError(ErrorMessages.SAVE_USER_ERROR);
    }

    const user = this.usersRepository.create({
      name,
      email,
      password,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
