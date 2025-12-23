import { EnrollmentRepository } from '../../repositories/enrollment.repository';
import { AppError } from '../../utils/app-error';

export class CancelEnrollmentUseCase {
  constructor(private enrollmentRepository: EnrollmentRepository) {}

  async execute(id: string) {
    // Verificar se matrícula existe
    const enrollment = await this.enrollmentRepository.findById(id);
    if (!enrollment) {
      throw new AppError('Matrícula não encontrada', 404);
    }

    // Verificar se já está cancelada
    if (enrollment.status === 'CANCELED') {
      throw new AppError('Matrícula já está cancelada', 400);
    }

    // Cancelar matrícula
    const updatedEnrollment = await this.enrollmentRepository.updateStatus(id, 'CANCELED');

    return updatedEnrollment;
  }
}
