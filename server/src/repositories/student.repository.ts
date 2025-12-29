import prisma from '../config/prisma';
import { CreateStudentDTO, UpdateStudentDTO } from '../dtos/student.dto';

export class StudentRepository {
  async findAll() {
    return await prisma.student.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return await prisma.student.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async findByEmail(email: string) {
    return await prisma.student.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async findByRA(ra: string) {
    return await prisma.student.findFirst({
      where: { ra, deletedAt: null },
    });
  }

  async findByCPF(cpf: string) {
    return await prisma.student.findFirst({
      where: { cpf, deletedAt: null },
    });
  }

  async create(data: CreateStudentDTO) {
    return await prisma.student.create({
      data,
    });
  }

  async update(id: string, data: UpdateStudentDTO) {
    return await prisma.student.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.student.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
