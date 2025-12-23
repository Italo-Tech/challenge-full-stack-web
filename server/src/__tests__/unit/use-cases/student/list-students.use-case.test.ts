import { ListStudentsUseCase } from '../../../../use-cases/student/list-students.use-case';
import { StudentRepository } from '../../../../repositories/student.repository';
import { mockStudentList } from '../../../mocks/student.mock';

describe('ListStudentsUseCase', () => {
  let studentRepository: jest.Mocked<StudentRepository>;
  let sut: ListStudentsUseCase;

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

    sut = new ListStudentsUseCase(studentRepository);
  });

  it('deve retornar lista de alunos', async () => {
    // Arrange
    studentRepository.findAll.mockResolvedValue(mockStudentList);

    // Act
    const result = await sut.execute();

    // Assert
    expect(result).toEqual(mockStudentList);
    expect(result).toHaveLength(3);
    expect(studentRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve retornar array vazio quando não há alunos', async () => {
    // Arrange
    studentRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await sut.execute();

    // Assert
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(studentRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o repositório sem parâmetros', async () => {
    // Arrange
    studentRepository.findAll.mockResolvedValue(mockStudentList);

    // Act
    await sut.execute();

    // Assert
    expect(studentRepository.findAll).toHaveBeenCalledWith();
  });

  it('deve retornar lista com estrutura correta de alunos', async () => {
    // Arrange
    studentRepository.findAll.mockResolvedValue(mockStudentList);

    // Act
    const result = await sut.execute();

    // Assert
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('email');
    expect(result[0]).toHaveProperty('ra');
    expect(result[0]).toHaveProperty('cpf');
    expect(result[0]).toHaveProperty('createdAt');
    expect(result[0]).toHaveProperty('updatedAt');
  });
});
