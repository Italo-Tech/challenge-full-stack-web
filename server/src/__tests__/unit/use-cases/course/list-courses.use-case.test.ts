import { ListCoursesUseCase } from '../../../../use-cases/course/list-courses.use-case';
import { CourseRepository } from '../../../../repositories/course.repository';
import { mockCourseList } from '../../../mocks/course.mock';

describe('ListCoursesUseCase', () => {
  let courseRepository: jest.Mocked<CourseRepository>;
  let sut: ListCoursesUseCase;

  beforeEach(() => {
    courseRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<CourseRepository>;

    sut = new ListCoursesUseCase(courseRepository);
  });

  it('deve retornar lista de cursos', async () => {
    // Arrange
    courseRepository.findAll.mockResolvedValue(mockCourseList);

    // Act
    const result = await sut.execute();

    // Assert
    expect(result).toEqual(mockCourseList);
    expect(result).toHaveLength(2);
    expect(courseRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve retornar array vazio quando não há cursos', async () => {
    // Arrange
    courseRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await sut.execute();

    // Assert
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('deve chamar o repositório sem parâmetros', async () => {
    // Arrange
    courseRepository.findAll.mockResolvedValue(mockCourseList);

    // Act
    await sut.execute();

    // Assert
    expect(courseRepository.findAll).toHaveBeenCalledWith();
  });
});
