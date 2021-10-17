import CreateUserRequest from '../dtos/CreateUserRequest';
import User from '../infra/typeorm/entities/user';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: CreateUserRequest): Promise<User>;
  findAll(): Promise<User[]>;
}
