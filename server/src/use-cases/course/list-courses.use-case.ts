import { CourseRepository } from '../../repositories/course.repository';

export class ListCoursesUseCase {
  constructor(private courseRepository: CourseRepository) {}

  async execute() {
    const courses = await this.courseRepository.findAll();
    return courses;
  }
}
