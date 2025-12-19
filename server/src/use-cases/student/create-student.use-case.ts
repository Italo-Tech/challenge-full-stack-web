import { StudentRepository } from '../../repositories/student.repository';
import { CreateStudentDTO } from '../../dtos/student.dto';
import { AppError } from '../../utils/app-error';

export class CreateStudentUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute(data: CreateStudentDTO) {
    // Check if the email already exists.
    const studentWithEmail = await this.studentRepository.findByEmail(data.email);
    if (studentWithEmail) {
      throw new AppError('Email já cadastrado', 409);
    }

    // Check if the RA already exists
    const studentWithRA = await this.studentRepository.findByRA(data.ra);
    if (studentWithRA) {
      throw new AppError('RA já cadastrado', 409);
    }

    // Check if the CPF already exists
    const studentWithCPF = await this.studentRepository.findByCPF(data.cpf);
    if (studentWithCPF) {
      throw new AppError('CPF já cadastrado', 409);
    }

    // Create student
    const student = await this.studentRepository.create(data);

    return student;
  }
}
