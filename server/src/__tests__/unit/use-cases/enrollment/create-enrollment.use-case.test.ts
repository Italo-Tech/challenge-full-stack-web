import { CreateEnrollmentUseCase } from '../../../../use-cases/enrollment/create-enrollment.use-case';
import { EnrollmentRepository } from '../../../../repositories/enrollment.repository';
import { StudentRepository } from '../../../../repositories/student.repository';
import { ClassRepository } from '../../../../repositories/class.repository';
import { AppError } from '../../../../utils/app-error';
import { mockEnrollment, mockCreateEnrollmentDTO } from '../../../mocks/enrollment.mock';
import { mockStudent } from '../../../mocks/student.mock';
import { mockClass } from '../../../mocks/class.mock';

describe('CreateEnrollmentUseCase', () => {
  let enrollmentRepository: jest.Mocked<EnrollmentRepository>;
  let studentRepository: jest.Mocked<StudentRepository>;
  let classRepository: jest.Mocked<ClassRepository>;
  let sut: CreateEnrollmentUseCase;

  beforeEach(() => {
    enrollmentRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByStudentId: jest.fn(),
      findByClassId: jest.fn(),
      findByStudentAndClass: jest.fn(),
      create: jest.fn(),
      updateStatus: jest.fn(),
      delete: jest.fn(),
    } as any;

    studentRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findByRA: jest.fn(),
      findByCPF: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    classRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCourseId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    sut = new CreateEnrollmentUseCase(enrollmentRepository, studentRepository, classRepository);
  });

  it('deve criar uma matrícula com dados válidos', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(mockStudent);
    classRepository.findById.mockResolvedValue(mockClass);
    enrollmentRepository.findByStudentAndClass.mockResolvedValue(null);
    enrollmentRepository.create.mockResolvedValue(mockEnrollment);

    // Act
    const result = await sut.execute(mockCreateEnrollmentDTO);

    // Assert
    expect(result).toEqual(mockEnrollment);
    expect(studentRepository.findById).toHaveBeenCalledWith(mockCreateEnrollmentDTO.studentId);
    expect(classRepository.findById).toHaveBeenCalledWith(mockCreateEnrollmentDTO.classId);
    expect(enrollmentRepository.create).toHaveBeenCalledWith(mockCreateEnrollmentDTO);
  });

  it('deve lançar erro 404 se aluno não existe', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(mockCreateEnrollmentDTO)).rejects.toThrow(AppError);
    await expect(sut.execute(mockCreateEnrollmentDTO)).rejects.toMatchObject({
      message: 'Aluno não encontrado',
      statusCode: 404,
    });
    expect(classRepository.findById).not.toHaveBeenCalled();
    expect(enrollmentRepository.create).not.toHaveBeenCalled();
  });

  it('deve lançar erro 404 se turma não existe', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(mockStudent);
    classRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(mockCreateEnrollmentDTO)).rejects.toThrow(AppError);
    await expect(sut.execute(mockCreateEnrollmentDTO)).rejects.toMatchObject({
      message: 'Turma não encontrada',
      statusCode: 404,
    });
    expect(enrollmentRepository.create).not.toHaveBeenCalled();
  });

  it('deve lançar erro 409 se aluno já está matriculado na turma (ACTIVE)', async () => {
    // Arrange
    const activeEnrollment = { ...mockEnrollment, status: 'ACTIVE' as const };
    studentRepository.findById.mockResolvedValue(mockStudent);
    classRepository.findById.mockResolvedValue(mockClass);
    enrollmentRepository.findByStudentAndClass.mockResolvedValue(activeEnrollment);

    // Act & Assert
    await expect(sut.execute(mockCreateEnrollmentDTO)).rejects.toThrow(AppError);
    await expect(sut.execute(mockCreateEnrollmentDTO)).rejects.toMatchObject({
      message: 'Aluno já está matriculado nesta turma',
      statusCode: 409,
    });
    expect(enrollmentRepository.create).not.toHaveBeenCalled();
  });

  it('deve lançar erro 409 se aluno teve matrícula cancelada na turma', async () => {
    // Arrange
    const canceledEnrollment = { ...mockEnrollment, status: 'CANCELED' as const };
    studentRepository.findById.mockResolvedValue(mockStudent);
    classRepository.findById.mockResolvedValue(mockClass);
    enrollmentRepository.findByStudentAndClass.mockResolvedValue(canceledEnrollment);

    // Act & Assert
    await expect(sut.execute(mockCreateEnrollmentDTO)).rejects.toThrow(AppError);
    await expect(sut.execute(mockCreateEnrollmentDTO)).rejects.toMatchObject({
      message: 'Aluno já teve uma matrícula cancelada nesta turma',
      statusCode: 409,
    });
    expect(enrollmentRepository.create).not.toHaveBeenCalled();
  });

  it('deve verificar aluno e turma antes de criar matrícula', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(mockStudent);
    classRepository.findById.mockResolvedValue(mockClass);
    enrollmentRepository.findByStudentAndClass.mockResolvedValue(null);
    enrollmentRepository.create.mockResolvedValue(mockEnrollment);

    // Act
    await sut.execute(mockCreateEnrollmentDTO);

    // Assert
    expect(studentRepository.findById).toHaveBeenCalled();
    expect(classRepository.findById).toHaveBeenCalled();
    expect(enrollmentRepository.findByStudentAndClass).toHaveBeenCalled();
    expect(enrollmentRepository.create).toHaveBeenCalled();
  });
});
