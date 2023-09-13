import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

type Filter = Prisma.UserWhereInput;
type Create = Prisma.UserCreateInput;
type Select = Prisma.UserSelect<DefaultArgs>;
const selectedData: Select = {
  email: true,
  username: true,
  id: true,
  fullname: true,
  avatarUrl: true
};

class UserRepository {
  constructor(private User: Prisma.UserDelegate<DefaultArgs>) {}

  async findById(id: string) {
    return this.User.findFirst({
      where: {
        id
      }
    });
  }

  async findOne(filter: Filter) {
    return this.User.findFirst({
      where: {
        ...filter
      }
    });
  }

  async create(data: Create) {
    return this.User.create({
      data: {
        ...data
      }
    });
  }

  async findMany(filter: Filter, select?: Select) {
    return this.User.findMany({
      where: {
        ...filter
      },
      select: {
        ...select,
        ...selectedData
      }
    });
  }
}

export default UserRepository;
