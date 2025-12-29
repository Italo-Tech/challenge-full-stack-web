import { CourseRepository } from '../../repositories/course.repository';
import { AppError } from '../../utils/app-error';

export class DeleteCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(id: string) {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new AppError('Curso não encontrado', 404);
    }

    await this.courseRepository.delete(id);
  }
}
