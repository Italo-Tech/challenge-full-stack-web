import { Request, Response } from 'express';
import { CourseRepository } from '../repositories/course.repository';
import { CreateCourseUseCase } from '../use-cases/course/create-course.use-case';
import { ListCoursesUseCase } from '../use-cases/course/list-courses.use-case';

export class CourseController {
  async create(req: Request, res: Response) {
    const courseRepository = new CourseRepository();
    const createCourseUseCase = new CreateCourseUseCase(courseRepository);

    const course = await createCourseUseCase.execute(req.body);

    return res.status(201).json(course);
  }

  async list(_req: Request, res: Response) {
    const courseRepository = new CourseRepository();
    const listCoursesUseCase = new ListCoursesUseCase(courseRepository);

    const courses = await listCoursesUseCase.execute();

    return res.json(courses);
  }
}
