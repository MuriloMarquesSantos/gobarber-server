import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
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
}

export default UsersController;
