import { EnrollmentRepository } from '../../repositories/enrollment.repository';

export class ListEnrollmentsUseCase {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute() {
    const enrollments = await this.enrollmentRepository.findAll();
    return enrollments;
  }
}
