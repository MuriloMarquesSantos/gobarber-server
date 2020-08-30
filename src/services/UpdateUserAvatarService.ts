import UserAvatarRequest from '../dto/UserAvatarRequest';

class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFileName,
  }: UserAvatarRequest): Promise<void>;
}

export default UpdateUserAvatarService;
