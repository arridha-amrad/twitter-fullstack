import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

class TokenRepository {
  constructor(private Token: Prisma.TokenDelegate<DefaultArgs>) {}

  async find(token: string) {
    return this.Token.findFirst({
      where: {
        value: token
      }
    });
  }

  async remove(id: number) {
    return this.Token.delete({
      where: {
        id
      }
    });
  }

  async update(id: number, token: string) {
    return this.Token.update({
      where: {
        id
      },
      data: {
        value: token
      }
    });
  }

  async create(name: string, value: string, userId: string) {
    return this.Token.create({
      data: {
        name,
        value,
        userId
      }
    });
  }
}

export default TokenRepository;
