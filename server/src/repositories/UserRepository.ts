import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

class UserRepository {
  constructor(private User: Prisma.UserDelegate<DefaultArgs>) {}

  async findById(id: string) {
    return this.User.findFirst({
      where: {
        id
      }
    });
  }
}

export default UserRepository;
