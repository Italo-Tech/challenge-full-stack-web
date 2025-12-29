import { Request, Response } from 'express';
import { CourseRepository } from '../repositories/course.repository';
import { CreateCourseUseCase } from '../use-cases/course/create-course.use-case';
import { ListCoursesUseCase } from '../use-cases/course/list-courses.use-case';
import { UpdateCourseUseCase } from '../use-cases/course/update-course.use-case';
import { DeleteCourseUseCase } from '../use-cases/course/delete-course.use-case';

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

  async update(req: Request, res: Response) {
    const courseRepository = new CourseRepository();
    const updateCourseUseCase = new UpdateCourseUseCase(courseRepository);

    const { id } = req.params;
    const course = await updateCourseUseCase.execute(id, req.body);

    return res.json(course);
  }

  async delete(req: Request, res: Response) {
    const courseRepository = new CourseRepository();
    const deleteCourseUseCase = new DeleteCourseUseCase(courseRepository);

    const { id } = req.params;
    await deleteCourseUseCase.execute(id);

    return res.status(204).send();
  }
}
