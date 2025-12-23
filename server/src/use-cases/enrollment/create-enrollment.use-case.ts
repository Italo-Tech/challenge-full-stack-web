import { EnrollmentRepository } from '../../repositories/enrollment.repository';
import { StudentRepository } from '../../repositories/student.repository';
import { ClassRepository } from '../../repositories/class.repository';
import { CreateEnrollmentDTO } from '../../dtos/enrollment.dto';
import { AppError } from '../../utils/app-error';

export class CreateEnrollmentUseCase {
  constructor(
    private enrollmentRepository: EnrollmentRepository,
    private studentRepository: StudentRepository,
    private classRepository: ClassRepository
  ) {}

  async execute(data: CreateEnrollmentDTO) {
    // Verificar se aluno existe
    const student = await this.studentRepository.findById(data.studentId);
    if (!student) {
      throw new AppError('Aluno não encontrado', 404);
    }

    // Verificar se turma existe
    const classExists = await this.classRepository.findById(data.classId);
    if (!classExists) {
      throw new AppError('Turma não encontrada', 404);
    }

    // Verificar se já existe matrícula ativa para este aluno nesta turma
    const existingEnrollment = await this.enrollmentRepository.findByStudentAndClass(
      data.studentId,
      data.classId
    );

    if (existingEnrollment) {
      if (existingEnrollment.status === 'ACTIVE') {
        throw new AppError('Aluno já está matriculado nesta turma', 409);
      } else {
        throw new AppError('Aluno já teve uma matrícula cancelada nesta turma', 409);
      }
    }

    // Criar matrícula
    const enrollment = await this.enrollmentRepository.create(data);

    return enrollment;
  }
}
