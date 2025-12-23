import { CreateCourseUseCase } from '../../../../use-cases/course/create-course.use-case';
import { CourseRepository } from '../../../../repositories/course.repository';
import { mockCourse, mockCreateCourseDTO } from '../../../mocks/course.mock';

describe('CreateCourseUseCase', () => {
  let courseRepository: jest.Mocked<CourseRepository>;
  let sut: CreateCourseUseCase;

  beforeEach(() => {
    courseRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<CourseRepository>;

    sut = new CreateCourseUseCase(courseRepository);
  });

  it('deve criar um curso com dados válidos', async () => {
    // Arrange
    courseRepository.create.mockResolvedValue(mockCourse);

    // Act
    const result = await sut.execute(mockCreateCourseDTO);

    // Assert
    expect(result).toEqual(mockCourse);
    expect(courseRepository.create).toHaveBeenCalledWith(mockCreateCourseDTO);
    expect(courseRepository.create).toHaveBeenCalledTimes(1);
  });

  it('deve criar curso com descrição opcional', async () => {
    // Arrange
    const courseWithoutDescription = { name: 'Curso sem descrição' };
    const createdCourse = { ...mockCourse, description: null };
    courseRepository.create.mockResolvedValue(createdCourse);

    // Act
    const result = await sut.execute(courseWithoutDescription);

    // Assert
    expect(result).toEqual(createdCourse);
    expect(courseRepository.create).toHaveBeenCalledWith(courseWithoutDescription);
  });

  it('deve retornar curso com todas as propriedades', async () => {
    // Arrange
    courseRepository.create.mockResolvedValue(mockCourse);

    // Act
    const result = await sut.execute(mockCreateCourseDTO);

    // Assert
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('createdAt');
  });
});
