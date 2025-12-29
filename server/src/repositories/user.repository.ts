import prisma from '../config/prisma';

export class UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async findById(id: string) {
    return await prisma.user.findFirst({
      where: { id, deletedAt: null },
    });
  }
}
