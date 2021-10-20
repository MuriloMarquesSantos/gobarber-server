import CreateUserRequest from '@modules/users/dtos/CreateUserRequest';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/user';
import { uuid } from 'uuidv4';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.id === id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find(user => user.email === email);

    return foundUser;
  }

  public async create({
    email,
    name,
    password,
  }: CreateUserRequest): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), email, name, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const foundIndex = this.users.findIndex(
      userIndex => userIndex.id === user.id,
    );

    this.users[foundIndex] = user;

    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }
}

export default UsersRepository;
