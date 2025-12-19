import { StudentRepository } from '../../repositories/student.repository';
import { AppError } from '../../utils/app-error';

export class DeleteStudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: string) {
    // Check if student exists.
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new AppError('Aluno não encontrado', 404);
    }

    // Delete student
    await this.studentRepository.delete(id);
  }
}
