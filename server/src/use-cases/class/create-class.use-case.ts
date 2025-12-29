import { ClassRepository } from '../../repositories/class.repository';
import { CourseRepository } from '../../repositories/course.repository';
import { CreateClassDTO } from '../../dtos/class.dto';
import { AppError } from '../../utils/app-error';

export class CreateClassUseCase {
  constructor(
    private classRepository: ClassRepository,
    private courseRepository: CourseRepository
  ) {}

  async execute(data: CreateClassDTO) {
    // Check if the course exists.
    const course = await this.courseRepository.findById(data.courseId);
    if (!course) {
      throw new AppError('Curso não encontrado', 404);
    }

    // Validate dates
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (endDate <= startDate) {
      throw new AppError('Data de término deve ser posterior à data de início', 400);
    }

    const classCreated = await this.classRepository.create(data);
    
    // Serializar datas para evitar problemas de timezone
    return {
      ...classCreated,
      startDate: classCreated.startDate.toISOString().split('T')[0],
      endDate: classCreated.endDate.toISOString().split('T')[0],
    };
  }
}
