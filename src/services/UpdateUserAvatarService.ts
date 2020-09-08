import { getRepository } from 'typeorm';
import path from 'path';
import { promises } from 'fs';
import UserAvatarRequest from '../dto/UserAvatarRequest';
import User from '../models/User';
import uploadConfig from '../config/upload';
import UserResponse from '../dto/UserResponse';

class UpdateUserAvatarService {
  userRepository = getRepository(User);

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
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new Error('User not found');
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

    return this.userRepository.save(user);
  }
}

export default UpdateUserAvatarService;
