import { UpdateStudentUseCase } from '../../../../use-cases/student/update-student.use-case';
import { StudentRepository } from '../../../../repositories/student.repository';
import { AppError } from '../../../../utils/app-error';
import { mockStudent, mockUpdateStudentDTO } from '../../../mocks/student.mock';

describe('UpdateStudentUseCase', () => {
  let studentRepository: jest.Mocked<StudentRepository>;
  let sut: UpdateStudentUseCase;

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

    sut = new UpdateStudentUseCase(studentRepository);
  });

  it('deve atualizar um aluno com dados válidos', async () => {
    // Arrange
    const updatedStudent = { ...mockStudent, ...mockUpdateStudentDTO };
    studentRepository.findById.mockResolvedValue(mockStudent);
    studentRepository.findByEmail.mockResolvedValue(null);
    studentRepository.update.mockResolvedValue(updatedStudent);

    // Act
    const result = await sut.execute(mockStudent.id, mockUpdateStudentDTO);

    // Assert
    expect(result).toEqual(updatedStudent);
    expect(studentRepository.findById).toHaveBeenCalledWith(mockStudent.id);
    expect(studentRepository.update).toHaveBeenCalledWith(mockStudent.id, mockUpdateStudentDTO);
  });

  it('deve lançar erro 404 se aluno não existe', async () => {
    // Arrange
    studentRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute('non-existent-id', mockUpdateStudentDTO)).rejects.toThrow(AppError);
    await expect(sut.execute('non-existent-id', mockUpdateStudentDTO)).rejects.toMatchObject({
      message: 'Aluno não encontrado',
      statusCode: 404,
    });
    expect(studentRepository.update).not.toHaveBeenCalled();
  });

  it('deve lançar erro 409 se email já existe em outro aluno', async () => {
    // Arrange
    const anotherStudent = { ...mockStudent, id: 'another-id' };
    studentRepository.findById.mockResolvedValue(mockStudent);
    studentRepository.findByEmail.mockResolvedValue(anotherStudent);

    // Act & Assert
    await expect(sut.execute(mockStudent.id, { email: 'another@test.com' })).rejects.toThrow(AppError);
    await expect(sut.execute(mockStudent.id, { email: 'another@test.com' })).rejects.toMatchObject({
      message: 'Email já cadastrado',
      statusCode: 409,
    });
    expect(studentRepository.update).not.toHaveBeenCalled();
  });

  it('deve permitir atualização parcial', async () => {
    // Arrange
    const partialUpdate = { name: 'Novo Nome' };
    const updatedStudent = { ...mockStudent, name: 'Novo Nome' };
    studentRepository.findById.mockResolvedValue(mockStudent);
    studentRepository.update.mockResolvedValue(updatedStudent);

    // Act
    const result = await sut.execute(mockStudent.id, partialUpdate);

    // Assert
    expect(result.name).toBe('Novo Nome');
    expect(studentRepository.update).toHaveBeenCalledWith(mockStudent.id, partialUpdate);
  });

  it('não deve verificar email se não está sendo atualizado', async () => {
    // Arrange
    const updateWithoutEmail = { name: 'Novo Nome' };
    const updatedStudent = { ...mockStudent, name: 'Novo Nome' };
    studentRepository.findById.mockResolvedValue(mockStudent);
    studentRepository.update.mockResolvedValue(updatedStudent);

    // Act
    await sut.execute(mockStudent.id, updateWithoutEmail);

    // Assert
    expect(studentRepository.findByEmail).not.toHaveBeenCalled();
  });

  it('deve permitir atualizar para o mesmo email', async () => {
    // Arrange
    const sameEmailUpdate = { email: mockStudent.email };
    studentRepository.findById.mockResolvedValue(mockStudent);
    studentRepository.update.mockResolvedValue(mockStudent);

    // Act
    await sut.execute(mockStudent.id, sameEmailUpdate);

    // Assert
    expect(studentRepository.findByEmail).not.toHaveBeenCalled();
    expect(studentRepository.update).toHaveBeenCalledWith(mockStudent.id, sameEmailUpdate);
  });
});
