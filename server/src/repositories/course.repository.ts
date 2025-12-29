import prisma from '../config/prisma';
import { CreateCourseDTO, UpdateCourseDTO } from '../dtos/course.dto';

export class CourseRepository {
  async findAll() {
    return await prisma.course.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        classes: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async findById(id: string) {
    return await prisma.course.findFirst({
      where: { id, deletedAt: null },
      include: {
        classes: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async create(data: CreateCourseDTO) {
    return await prisma.course.create({
      data,
    });
  }

  async update(id: string, data: UpdateCourseDTO) {
    return await prisma.course.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.course.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
