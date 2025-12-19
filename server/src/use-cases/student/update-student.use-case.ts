import { StudentRepository } from '../../repositories/student.repository';
import { UpdateStudentDTO } from '../../dtos/student.dto';
import { AppError } from '../../utils/app-error';

export class UpdateStudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: string, data: UpdateStudentDTO) {
    // Check if student exists.
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new AppError('Aluno não encontrado', 404);
    }

    // If the email is being updated, check if it already exists.
    if (data.email && data.email !== student.email) {
      const studentWithEmail = await this.studentRepository.findByEmail(data.email);
      if (studentWithEmail) {
        throw new AppError('Email já cadastrado', 409);
      }
    }

    // Update student
    const updatedStudent = await this.studentRepository.update(id, data);

    return updatedStudent;
  }
}
