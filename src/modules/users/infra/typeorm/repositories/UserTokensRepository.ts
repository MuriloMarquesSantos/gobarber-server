import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/userToken';

export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      userId,
    });

    return this.ormRepository.save(userToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }
}
