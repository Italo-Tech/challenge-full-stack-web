import prisma from '../config/prisma';
import { CreateClassDTO, UpdateClassDTO } from '../dtos/class.dto';

export class ClassRepository {
  async findAll() {
    return await prisma.class.findMany({
      where: { deletedAt: null },
      orderBy: { startDate: 'desc' },
      include: {
        course: {
          select: {
            id: true,
            name: true,
          },
        },
        enrollments: {
          where: { deletedAt: null },
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                ra: true,
              },
            },
          },
        },
      },
    });
  }

  // Not used yet
  async findById(id: string) {
    return await prisma.class.findFirst({
      where: { id, deletedAt: null },
      include: {
        course: {
          select: {
            id: true,
            name: true,
          },
        },
        enrollments: {
          where: { deletedAt: null },
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
                ra: true,
              },
            },
          },
        },
      },
    });
  }

  // Not used yet
  async findByCourseId(courseId: string) {
    return await prisma.class.findMany({
      where: { courseId, deletedAt: null },
      orderBy: { startDate: 'desc' },
      include: {
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(data: CreateClassDTO) {
    return await prisma.class.create({
      data: {
        courseId: data.courseId,
        name: data.name,
        startDate: new Date(`${data.startDate}T00:00:00.000Z`),
        endDate: new Date(`${data.endDate}T00:00:00.000Z`),
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // Not used yet
  async update(id: string, data: UpdateClassDTO) {
    return await prisma.class.update({
      where: { id },
      data: {
        ...data,
        // Adicionar 'T00:00:00.000Z' para garantir que seja tratado como UTC
        startDate: data.startDate ? new Date(`${data.startDate}T00:00:00.000Z`) : undefined,
        endDate: data.endDate ? new Date(`${data.endDate}T00:00:00.000Z`) : undefined,
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // Not used yet
  async delete(id: string) {
    return await prisma.class.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
