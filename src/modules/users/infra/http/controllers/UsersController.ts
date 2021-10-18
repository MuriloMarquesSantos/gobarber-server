import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import { container } from 'tsyringe';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const createdUser = await createUserService.execute({
      name,
      email,
      password,
    });
    return response.status(201).json(createdUser);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const usersRepository = new UsersRepository();
    const users = await usersRepository.findAll();
    const usersResponse = users.map(user => user.toUserResponse());

    return response.status(200).json(usersResponse);
  }

  public async updateUserAvatar(request: Request, response: Response) {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const userResponse = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.status(200).json(userResponse);
  }
}

export default UsersController;
