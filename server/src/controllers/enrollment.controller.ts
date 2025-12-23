import { Request, Response } from 'express';
import { EnrollmentRepository } from '../repositories/enrollment.repository';
import { StudentRepository } from '../repositories/student.repository';
import { ClassRepository } from '../repositories/class.repository';
import { CreateEnrollmentUseCase } from '../use-cases/enrollment/create-enrollment.use-case';
import { ListEnrollmentsUseCase } from '../use-cases/enrollment/list-enrollments.use-case';
import { CancelEnrollmentUseCase } from '../use-cases/enrollment/cancel-enrollment.use-case';

export class EnrollmentController {
  async create(req: Request, res: Response) {
    const enrollmentRepository = new EnrollmentRepository();
    const studentRepository = new StudentRepository();
    const classRepository = new ClassRepository();
    const createEnrollmentUseCase = new CreateEnrollmentUseCase(
      enrollmentRepository,
      studentRepository,
      classRepository
    );

    const enrollment = await createEnrollmentUseCase.execute(req.body);

    return res.status(201).json(enrollment);
  }

  async list(_req: Request, res: Response) {
    const enrollmentRepository = new EnrollmentRepository();
    const listEnrollmentsUseCase = new ListEnrollmentsUseCase(enrollmentRepository);

    const enrollments = await listEnrollmentsUseCase.execute();

    return res.json(enrollments);
  }

  async cancel(req: Request, res: Response) {
    const { id } = req.params;

    const enrollmentRepository = new EnrollmentRepository();
    const cancelEnrollmentUseCase = new CancelEnrollmentUseCase(enrollmentRepository);

    const enrollment = await cancelEnrollmentUseCase.execute(id);

    return res.json(enrollment);
  }
}
