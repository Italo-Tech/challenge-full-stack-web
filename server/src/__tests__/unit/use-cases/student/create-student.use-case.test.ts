import { CreateStudentUseCase } from '../../../../use-cases/student/create-student.use-case';
import { StudentRepository } from '../../../../repositories/student.repository';
import { AppError } from '../../../../utils/app-error';
import { mockStudent, mockCreateStudentDTO } from '../../../mocks/student.mock';

describe('CreateStudentUseCase', () => {
  let studentRepository: jest.Mocked<StudentRepository>;
  let sut: CreateStudentUseCase;

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

    sut = new CreateStudentUseCase(studentRepository);
  });

  it('deve criar um aluno com dados válidos', async () => {
    // Arrange
    studentRepository.findByEmail.mockResolvedValue(null);
    studentRepository.findByRA.mockResolvedValue(null);
    studentRepository.findByCPF.mockResolvedValue(null);
    studentRepository.create.mockResolvedValue(mockStudent);

    // Act
    const result = await sut.execute(mockCreateStudentDTO);

    // Assert
    expect(result).toEqual(mockStudent);
    expect(studentRepository.findByEmail).toHaveBeenCalledWith(mockCreateStudentDTO.email);
    expect(studentRepository.findByRA).toHaveBeenCalledWith(mockCreateStudentDTO.ra);
    expect(studentRepository.findByCPF).toHaveBeenCalledWith(mockCreateStudentDTO.cpf);
    expect(studentRepository.create).toHaveBeenCalledWith(mockCreateStudentDTO);
  });

  it('deve lançar erro 409 se email já existe', async () => {
    // Arrange
    studentRepository.findByEmail.mockResolvedValue(mockStudent);

    // Act & Assert
    await expect(sut.execute(mockCreateStudentDTO)).rejects.toThrow(AppError);
    await expect(sut.execute(mockCreateStudentDTO)).rejects.toMatchObject({
      message: 'Email já cadastrado',
      statusCode: 409,
    });
    expect(studentRepository.findByEmail).toHaveBeenCalledWith(mockCreateStudentDTO.email);
    expect(studentRepository.create).not.toHaveBeenCalled();
  });

  it('deve lançar erro 409 se RA já existe', async () => {
    // Arrange
    studentRepository.findByEmail.mockResolvedValue(null);
    studentRepository.findByRA.mockResolvedValue(mockStudent);

    // Act & Assert
    await expect(sut.execute(mockCreateStudentDTO)).rejects.toThrow(AppError);
    await expect(sut.execute(mockCreateStudentDTO)).rejects.toMatchObject({
      message: 'RA já cadastrado',
      statusCode: 409,
    });
    expect(studentRepository.findByRA).toHaveBeenCalledWith(mockCreateStudentDTO.ra);
    expect(studentRepository.create).not.toHaveBeenCalled();
  });

  it('deve lançar erro 409 se CPF já existe', async () => {
    // Arrange
    studentRepository.findByEmail.mockResolvedValue(null);
    studentRepository.findByRA.mockResolvedValue(null);
    studentRepository.findByCPF.mockResolvedValue(mockStudent);

    // Act & Assert
    await expect(sut.execute(mockCreateStudentDTO)).rejects.toThrow(AppError);
    await expect(sut.execute(mockCreateStudentDTO)).rejects.toMatchObject({
      message: 'CPF já cadastrado',
      statusCode: 409,
    });
    expect(studentRepository.findByCPF).toHaveBeenCalledWith(mockCreateStudentDTO.cpf);
    expect(studentRepository.create).not.toHaveBeenCalled();
  });

  it('deve verificar email, RA e CPF antes de criar', async () => {
    // Arrange
    studentRepository.findByEmail.mockResolvedValue(null);
    studentRepository.findByRA.mockResolvedValue(null);
    studentRepository.findByCPF.mockResolvedValue(null);
    studentRepository.create.mockResolvedValue(mockStudent);

    // Act
    await sut.execute(mockCreateStudentDTO);

    // Assert
    expect(studentRepository.findByEmail).toHaveBeenCalled();
    expect(studentRepository.findByRA).toHaveBeenCalled();
    expect(studentRepository.findByCPF).toHaveBeenCalled();
    expect(studentRepository.create).toHaveBeenCalled();
  });
});
