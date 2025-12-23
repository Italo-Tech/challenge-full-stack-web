import { CancelEnrollmentUseCase } from '../../../../use-cases/enrollment/cancel-enrollment.use-case';
import { EnrollmentRepository } from '../../../../repositories/enrollment.repository';
import { AppError } from '../../../../utils/app-error';
import { mockEnrollment } from '../../../mocks/enrollment.mock';

describe('CancelEnrollmentUseCase', () => {
  let enrollmentRepository: jest.Mocked<EnrollmentRepository>;
  let sut: CancelEnrollmentUseCase;

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

    sut = new CancelEnrollmentUseCase(enrollmentRepository);
  });

  it('deve cancelar uma matrícula ativa', async () => {
    // Arrange
    const canceledEnrollment = { ...mockEnrollment, status: 'CANCELED' as const };
    enrollmentRepository.findById.mockResolvedValue(mockEnrollment);
    enrollmentRepository.updateStatus.mockResolvedValue(canceledEnrollment);

    // Act
    const result = await sut.execute(mockEnrollment.id);

    // Assert
    expect(result).toEqual(canceledEnrollment);
    expect(result.status).toBe('CANCELED');
    expect(enrollmentRepository.findById).toHaveBeenCalledWith(mockEnrollment.id);
    expect(enrollmentRepository.updateStatus).toHaveBeenCalledWith(mockEnrollment.id, 'CANCELED');
  });

  it('deve lançar erro 404 se matrícula não existe', async () => {
    // Arrange
    enrollmentRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute('non-existent-id')).rejects.toThrow(AppError);
    await expect(sut.execute('non-existent-id')).rejects.toMatchObject({
      message: 'Matrícula não encontrada',
      statusCode: 404,
    });
    expect(enrollmentRepository.updateStatus).not.toHaveBeenCalled();
  });

  it('deve lançar erro 400 se matrícula já está cancelada', async () => {
    // Arrange
    const canceledEnrollment = { ...mockEnrollment, status: 'CANCELED' as const };
    enrollmentRepository.findById.mockResolvedValue(canceledEnrollment);

    // Act & Assert
    await expect(sut.execute(mockEnrollment.id)).rejects.toThrow(AppError);
    await expect(sut.execute(mockEnrollment.id)).rejects.toMatchObject({
      message: 'Matrícula já está cancelada',
      statusCode: 400,
    });
    expect(enrollmentRepository.updateStatus).not.toHaveBeenCalled();
  });

  it('deve verificar status antes de cancelar', async () => {
    // Arrange
    enrollmentRepository.findById.mockResolvedValue(mockEnrollment);
    enrollmentRepository.updateStatus.mockResolvedValue({ ...mockEnrollment, status: 'CANCELED' as const });

    // Act
    await sut.execute(mockEnrollment.id);

    // Assert
    expect(enrollmentRepository.findById).toHaveBeenCalled();
    expect(mockEnrollment.status).toBe('ACTIVE');
  });
});
