import { CourseRepository } from '../../repositories/course.repository';
import { UpdateCourseDTO } from '../../dtos/course.dto';
import { AppError } from '../../utils/app-error';

export class UpdateCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(id: string, data: UpdateCourseDTO) {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new AppError('Curso não encontrado', 404);
    }

    const updatedCourse = await this.courseRepository.update(id, data);
    return updatedCourse;
  }
}
