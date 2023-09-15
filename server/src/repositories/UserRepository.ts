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

  async update(
    filter: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  ) {
    return this.User.update({
      where: filter,
      data: data
    });
  }

  async findById(id: string) {
    return this.User.findFirst({
      where: {
        id
      }
    });
  }

  async findOne(filter: Filter, include?: Prisma.UserInclude<DefaultArgs>) {
    return this.User.findFirst({
      where: {
        ...filter
      },
      include: {
        ...include,
        _count: { select: { followers: true, followings: true } }
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
