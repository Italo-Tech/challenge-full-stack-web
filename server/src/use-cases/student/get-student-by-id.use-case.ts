import { StudentRepository } from '../../repositories/student.repository';
import { AppError } from '../../utils/app-error';

export class GetStudentByIdUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: string) {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new AppError('Aluno não encontrado', 404);
    }

    return student;
  }
}
