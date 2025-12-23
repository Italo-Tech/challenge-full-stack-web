import { CreateClassUseCase } from '../../../../use-cases/class/create-class.use-case';
import { ClassRepository } from '../../../../repositories/class.repository';
import { CourseRepository } from '../../../../repositories/course.repository';
import { AppError } from '../../../../utils/app-error';
import { mockClass, mockCreateClassDTO } from '../../../mocks/class.mock';
import { mockCourse } from '../../../mocks/course.mock';

describe('CreateClassUseCase', () => {
  let classRepository: jest.Mocked<ClassRepository>;
  let courseRepository: jest.Mocked<CourseRepository>;
  let sut: CreateClassUseCase;

  beforeEach(() => {
    classRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCourseId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    courseRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    sut = new CreateClassUseCase(classRepository, courseRepository);
  });

  it('deve criar uma turma com dados válidos', async () => {
    // Arrange
    courseRepository.findById.mockResolvedValue(mockCourse);
    classRepository.create.mockResolvedValue(mockClass);

    // Act
    const result = await sut.execute(mockCreateClassDTO);

    // Assert
    expect(result).toEqual(mockClass);
    expect(courseRepository.findById).toHaveBeenCalledWith(mockCreateClassDTO.courseId);
    expect(classRepository.create).toHaveBeenCalledWith(mockCreateClassDTO);
  });

  it('deve lançar erro 404 se curso não existe', async () => {
    // Arrange
    courseRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(mockCreateClassDTO)).rejects.toThrow(AppError);
    await expect(sut.execute(mockCreateClassDTO)).rejects.toMatchObject({
      message: 'Curso não encontrado',
      statusCode: 404,
    });
    expect(classRepository.create).not.toHaveBeenCalled();
  });

  it('deve lançar erro 400 se data de término for anterior à data de início', async () => {
    // Arrange
    const invalidDates = {
      ...mockCreateClassDTO,
      startDate: new Date('2024-12-20'),
      endDate: new Date('2024-06-01'),
    };
    courseRepository.findById.mockResolvedValue(mockCourse);

    // Act & Assert
    await expect(sut.execute(invalidDates)).rejects.toThrow(AppError);
    await expect(sut.execute(invalidDates)).rejects.toMatchObject({
      message: 'Data de término deve ser posterior à data de início',
      statusCode: 400,
    });
    expect(classRepository.create).not.toHaveBeenCalled();
  });

  it('deve lançar erro 400 se data de término for igual à data de início', async () => {
    // Arrange
    const sameDate = new Date('2024-06-01');
    const invalidDates = {
      ...mockCreateClassDTO,
      startDate: sameDate,
      endDate: sameDate,
    };
    courseRepository.findById.mockResolvedValue(mockCourse);

    // Act & Assert
    await expect(sut.execute(invalidDates)).rejects.toThrow(AppError);
    await expect(sut.execute(invalidDates)).rejects.toMatchObject({
      message: 'Data de término deve ser posterior à data de início',
      statusCode: 400,
    });
  });

  it('deve verificar se o curso existe antes de criar a turma', async () => {
    // Arrange
    courseRepository.findById.mockResolvedValue(mockCourse);
    classRepository.create.mockResolvedValue(mockClass);

    // Act
    await sut.execute(mockCreateClassDTO);

    // Assert
    expect(courseRepository.findById).toHaveBeenCalled();
    expect(classRepository.create).toHaveBeenCalled();
  });
});
