import { CourseRepository } from '../../repositories/course.repository';
import { CreateCourseDTO } from '../../dtos/course.dto';

export class CreateCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute(data: CreateCourseDTO) {
    const course = await this.courseRepository.create(data);
    return course;
  }
}
