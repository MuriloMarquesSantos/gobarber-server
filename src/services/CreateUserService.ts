import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import CreateUserRequest from '../dto/CreateUserRequest';
import CreateUserResponse from '../dto/CreateUserResponse';

class CreateUserService {
  async execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    let responseUser: CreateUserResponse;

    try {
      const entitySaved = await usersRepository.save(user);
      responseUser = {
        name: entitySaved.name,
        email: entitySaved.email,
      };
    } catch (error) {
      throw new Error('Unable to save user');
    }

    return responseUser;
  }
}

export default CreateUserService;
