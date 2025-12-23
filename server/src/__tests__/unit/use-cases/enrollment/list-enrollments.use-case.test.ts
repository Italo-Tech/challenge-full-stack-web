import { ListEnrollmentsUseCase } from '../../../../use-cases/enrollment/list-enrollments.use-case';
import { EnrollmentRepository } from '../../../../repositories/enrollment.repository';
import { mockEnrollmentList } from '../../../mocks/enrollment.mock';

describe('ListEnrollmentsUseCase', () => {
  let enrollmentRepository: jest.Mocked<EnrollmentRepository>;
  let sut: ListEnrollmentsUseCase;

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

    sut = new ListEnrollmentsUseCase(enrollmentRepository);
  });

  it('deve retornar lista de matrículas', async () => {
    // Arrange
    enrollmentRepository.findAll.mockResolvedValue(mockEnrollmentList);

    // Act
    const result = await sut.execute();

    // Assert
    expect(result).toEqual(mockEnrollmentList);
    expect(result).toHaveLength(3);
    expect(enrollmentRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve retornar array vazio quando não há matrículas', async () => {
    // Arrange
    enrollmentRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await sut.execute();

    // Assert
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('deve chamar o repositório sem parâmetros', async () => {
    // Arrange
    enrollmentRepository.findAll.mockResolvedValue(mockEnrollmentList);

    // Act
    await sut.execute();

    // Assert
    expect(enrollmentRepository.findAll).toHaveBeenCalledWith();
  });

  it('deve retornar matrículas com diferentes status', async () => {
    // Arrange
    enrollmentRepository.findAll.mockResolvedValue(mockEnrollmentList);

    // Act
    const result = await sut.execute();

    // Assert
    const activeEnrollments = result.filter(e => e.status === 'ACTIVE');
    const canceledEnrollments = result.filter(e => e.status === 'CANCELED');
    expect(activeEnrollments).toHaveLength(2);
    expect(canceledEnrollments).toHaveLength(1);
  });
});
