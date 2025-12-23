import { DeleteStudentUseCase } from '../../../../use-cases/student/delete-student.use-case';
import { StudentRepository } from '../../../../repositories/student.repository';
import { AppError } from '../../../../utils/app-error';
import { mockStudent } from '../../../mocks/student.mock';

describe('DeleteStudentUseCase', () => {
  let studentRepository: jest.Mocked<StudentRepository>;
  let sut: DeleteStudentUseCase;

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

    sut = new DeleteStudentUseCase(studentRepository);
  });

  it('deve deletar aluno existente', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(mockStudent);
    studentRepository.delete.mockResolvedValue(mockStudent);

    // Act
    await sut.execute(mockStudent.id);

    // Assert
    expect(studentRepository.findById).toHaveBeenCalledWith(mockStudent.id);
    expect(studentRepository.delete).toHaveBeenCalledWith(mockStudent.id);
    expect(studentRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('deve lançar erro 404 se aluno não existe', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute('non-existent-id')).rejects.toThrow(AppError);
    await expect(sut.execute('non-existent-id')).rejects.toMatchObject({
      message: 'Aluno não encontrado',
      statusCode: 404,
    });
    expect(studentRepository.delete).not.toHaveBeenCalled();
  });

  it('deve verificar existência antes de deletar', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(mockStudent);
    studentRepository.delete.mockResolvedValue(mockStudent);

    // Act
    await sut.execute(mockStudent.id);

    // Assert
    expect(studentRepository.findById).toHaveBeenCalled();
    expect(studentRepository.delete).toHaveBeenCalled();
  });

  it('deve não retornar nada após deletar', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(mockStudent);
    studentRepository.delete.mockResolvedValue(mockStudent);

    // Act
    const result = await sut.execute(mockStudent.id);

    // Assert
    expect(result).toBeUndefined();
  });
});
