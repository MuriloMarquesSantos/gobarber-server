import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/userToken';

export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(userId: string): Promise<UserToken> {
    return Promise.resolve(new UserToken());
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return undefined;
  }
}
