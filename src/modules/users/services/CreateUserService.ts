import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import { inject, injectable } from 'tsyringe';
import CreateUserRequest from '../dtos/CreateUserRequest';
import UserResponse from '../dtos/UserResponse';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<UserResponse> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError(ErrorMessages.SAVE_USER_ERROR);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user.toUserResponse();
  }
}

export default CreateUserService;
