import prisma from '../config/prisma';
import { CreateStudentDTO, UpdateStudentDTO } from '../dtos/student.dto';

export class StudentRepository {
  async findAll() {
    return await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return await prisma.student.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await prisma.student.findUnique({
      where: { email },
    });
  }

  async findByRA(ra: string) {
    return await prisma.student.findUnique({
      where: { ra },
    });
  }

  async findByCPF(cpf: string) {
    return await prisma.student.findUnique({
      where: { cpf },
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
    return await prisma.student.delete({
      where: { id },
    });
  }
}
