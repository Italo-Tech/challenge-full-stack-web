import prisma from '../config/prisma';
import { CreateCourseDTO, UpdateCourseDTO } from '../dtos/course.dto';

export class CourseRepository {
  async findAll() {
    return await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        classes: true,
      },
    });
  }

  async findById(id: string) {
    return await prisma.course.findUnique({
      where: { id },
      include: {
        classes: true,
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
    return await prisma.course.delete({
      where: { id },
    });
  }
}
