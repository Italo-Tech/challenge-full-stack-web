import prisma from '../config/prisma';
import { CreateEnrollmentDTO } from '../dtos/enrollment.dto';

export class EnrollmentRepository {
  async findAll() {
    return await prisma.enrollment.findMany({
      orderBy: { enrolledAt: 'desc' },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            ra: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            startDate: true,
            endDate: true,
            course: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            ra: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            startDate: true,
            endDate: true,
            course: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  // Not used yet
  async findByStudentId(studentId: string) {
    return await prisma.enrollment.findMany({
      where: { studentId },
      orderBy: { enrolledAt: 'desc' },
      include: {
        class: {
          select: {
            id: true,
            name: true,
            startDate: true,
            endDate: true,
            course: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  // Not used yet
  async findByClassId(classId: string) {
    return await prisma.enrollment.findMany({
      where: { classId },
      orderBy: { enrolledAt: 'desc' },
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
    });
  }

  async findByStudentAndClass(studentId: string, classId: string) {
    return await prisma.enrollment.findUnique({
      where: {
        studentId_classId: {
          studentId,
          classId,
        },
      },
    });
  }

  async create(data: CreateEnrollmentDTO) {
    return await prisma.enrollment.create({
      data,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            ra: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            course: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async updateStatus(id: string, status: 'ACTIVE' | 'CANCELED') {
    return await prisma.enrollment.update({
      where: { id },
      data: { status },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            ra: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            course: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  // Not used yet
  async delete(id: string) {
    return await prisma.enrollment.delete({
      where: { id },
    });
  }
}
