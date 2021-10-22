import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import UserAvatarRequest from '../dtos/UserAvatarRequest';
import User from '../infra/typeorm/entities/user';
import UserResponse from '../dtos/UserResponse';
import AppError from '../../../shared/errors/AppError';
import ErrorMessages from '../../../shared/errors/ErrorMessages';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  private storageProvider: IStorageProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('StorageProvider')
    storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({
    userId,
    avatarFileName,
  }: UserAvatarRequest): Promise<UserResponse> {
    const user = await this.findUser(userId);

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    const updatedUser = await this.updateUser(user, fileName);

    const responseUser = updatedUser.toUserResponse();

    return responseUser;
  }

  async findUser(userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, 401);
    }
    return user;
  }

  async updateUser(user: User, avatarFileName: string): Promise<User> {
    user.avatar = avatarFileName;

    return this.usersRepository.save(user);
  }
}

export default UpdateUserAvatarService;
