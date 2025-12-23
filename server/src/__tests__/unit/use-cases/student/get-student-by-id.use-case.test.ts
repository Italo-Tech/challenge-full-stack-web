import { GetStudentByIdUseCase } from '../../../../use-cases/student/get-student-by-id.use-case';
import { StudentRepository } from '../../../../repositories/student.repository';
import { AppError } from '../../../../utils/app-error';
import { mockStudent } from '../../../mocks/student.mock';

describe('GetStudentByIdUseCase', () => {
  let studentRepository: jest.Mocked<StudentRepository>;
  let sut: GetStudentByIdUseCase;

  beforeEach(() => {
    studentRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findByRA: jest.fn(),
      findByCPF: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<StudentRepository>;

    sut = new GetStudentByIdUseCase(studentRepository);
  });

  it('deve retornar aluno quando encontrado', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(mockStudent);

    // Act
    const result = await sut.execute(mockStudent.id);

    // Assert
    expect(result).toEqual(mockStudent);
    expect(studentRepository.findById).toHaveBeenCalledWith(mockStudent.id);
    expect(studentRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('deve lançar AppError 404 quando aluno não existe', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute('non-existent-id')).rejects.toThrow(AppError);
    await expect(sut.execute('non-existent-id')).rejects.toMatchObject({
      message: 'Aluno não encontrado',
      statusCode: 404,
    });
    expect(studentRepository.findById).toHaveBeenCalledWith('non-existent-id');
  });

  it('deve chamar o repositório com o ID correto', async () => {
    // Arrange
    const testId = '123-test-id';
    studentRepository.findById.mockResolvedValue(mockStudent);

    // Act
    await sut.execute(testId);

    // Assert
    expect(studentRepository.findById).toHaveBeenCalledWith(testId);
  });
});
