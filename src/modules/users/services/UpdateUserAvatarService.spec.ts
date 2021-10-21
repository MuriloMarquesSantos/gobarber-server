import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('Should update user avatar correctly', () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
    );
  });
});
