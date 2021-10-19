import { getRepository } from 'typeorm';
import path from 'path';
import { promises } from 'fs';
import { injectable, inject } from 'tsyringe';
import UserAvatarRequest from '../dtos/UserAvatarRequest';
import User from '../infra/typeorm/entities/user';
import uploadConfig from '../../../config/upload';
import UserResponse from '../dtos/UserResponse';
import AppError from '../../../shared/errors/AppError';
import ErrorMessages from '../../../shared/errors/ErrorMessages';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    userId,
    avatarFileName,
  }: UserAvatarRequest): Promise<UserResponse> {
    const user = await this.findUser(userId);

    if (user.avatar) {
      this.unlinkExistingAvatar(user.avatar);
    }

    const updatedUser = await this.updateUser(user, avatarFileName);

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

  async unlinkExistingAvatar(userAvatar: string) {
    const userAvatarFilePath = path.join(uploadConfig.directory, userAvatar);
    const userAvatarFileExists = await promises.stat(userAvatarFilePath);

    if (userAvatarFileExists) {
      await promises.unlink(userAvatarFilePath);
    }
  }

  async updateUser(user: User, avatarFileName: string): Promise<User> {
    user.avatar = avatarFileName;

    return this.usersRepository.save(user);
  }
}

export default UpdateUserAvatarService;
