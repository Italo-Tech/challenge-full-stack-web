import { ListClassesUseCase } from '../../../../use-cases/class/list-classes.use-case';
import { ClassRepository } from '../../../../repositories/class.repository';
import { mockClassList } from '../../../mocks/class.mock';

describe('ListClassesUseCase', () => {
  let classRepository: jest.Mocked<ClassRepository>;
  let sut: ListClassesUseCase;

  beforeEach(() => {
    classRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCourseId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    sut = new ListClassesUseCase(classRepository);
  });

  it('deve retornar lista de turmas', async () => {
    // Arrange
    classRepository.findAll.mockResolvedValue(mockClassList);

    // Act
    const result = await sut.execute();

    // Assert
    expect(result).toEqual(mockClassList);
    expect(result).toHaveLength(2);
    expect(classRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve retornar array vazio quando não há turmas', async () => {
    // Arrange
    classRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await sut.execute();

    // Assert
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('deve chamar o repositório sem parâmetros', async () => {
    // Arrange
    classRepository.findAll.mockResolvedValue(mockClassList);

    // Act
    await sut.execute();

    // Assert
    expect(classRepository.findAll).toHaveBeenCalledWith();
  });
});
