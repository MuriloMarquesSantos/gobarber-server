import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import User from '../infra/entities/user';
import CreateUserRequest from '../dtos/CreateUserRequest';
import UserResponse from '../dtos/UserResponse';

class CreateUserService {
  usersRepository = getRepository(User);

  public async execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<UserResponse> {
    const checkUserExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError(ErrorMessages.SAVE_USER_ERROR);
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return user.toUserResponse();
  }
}

export default CreateUserService;
