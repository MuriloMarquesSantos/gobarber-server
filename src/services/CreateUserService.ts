import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/user';
import CreateUserRequest from '../dto/CreateUserRequest';
import UserResponse from '../dto/UserResponse';
import AppError from '../errors/AppError';
import ErrorMessages from '../errors/ErrorMessages';

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
