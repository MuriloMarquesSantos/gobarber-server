import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import CreateUserRequest from '../dto/CreateUserRequest';
import UserResponse from '../dto/UserResponse';
import AppError from '../errors/AppError';

class CreateUserService {
  usersRepository = getRepository(User);

  async execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<UserResponse> {
    const checkUserExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await this.saveUser(user);

    return savedUser;
  }

  async saveUser(user: User): Promise<UserResponse> {
    let responseUser: UserResponse;

    try {
      const entitySaved = await this.usersRepository.save(user);
      responseUser = {
        name: entitySaved.name,
        email: entitySaved.email,
      };
    } catch (error) {
      throw new AppError('Unable to save user');
    }

    return responseUser;
  }
}

export default CreateUserService;
