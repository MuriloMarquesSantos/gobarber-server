import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response) {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const userResponse = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.status(200).json(userResponse);
  }
}

export default UserAvatarController;
