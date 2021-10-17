import CreateUserRequest from '@modules/users/dtos/CreateUserRequest';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/user';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    email,
    name,
    password,
  }: CreateUserRequest): Promise<User> {
    const user = await this.ormRepository.create({ email, name, password });
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: email });
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: id });
  }

  public async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }
}

export default UsersRepository;
