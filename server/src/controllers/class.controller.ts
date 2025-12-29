import { Request, Response } from 'express';
import { ClassRepository } from '../repositories/class.repository';
import { CourseRepository } from '../repositories/course.repository';
import { CreateClassUseCase } from '../use-cases/class/create-class.use-case';
import { ListClassesUseCase } from '../use-cases/class/list-classes.use-case';
import { UpdateClassUseCase } from '../use-cases/class/update-class.use-case';
import { DeleteClassUseCase } from '../use-cases/class/delete-class.use-case';

export class ClassController {
  async create(req: Request, res: Response) {
    const classRepository = new ClassRepository();
    const courseRepository = new CourseRepository();
    const createClassUseCase = new CreateClassUseCase(classRepository, courseRepository);

    const classCreated = await createClassUseCase.execute(req.body);

    return res.status(201).json(classCreated);
  }

  async list(_req: Request, res: Response) {
    const classRepository = new ClassRepository();
    const listClassesUseCase = new ListClassesUseCase(classRepository);

    const classes = await listClassesUseCase.execute();

    return res.json(classes);
  }

  async update(req: Request, res: Response) {
    const classRepository = new ClassRepository();
    const updateClassUseCase = new UpdateClassUseCase(classRepository);

    const { id } = req.params;
    const classUpdated = await updateClassUseCase.execute(id, req.body);

    return res.json(classUpdated);
  }

  async delete(req: Request, res: Response) {
    const classRepository = new ClassRepository();
    const deleteClassUseCase = new DeleteClassUseCase(classRepository);

    const { id } = req.params;
    await deleteClassUseCase.execute(id);

    return res.status(204).send();
  }
}
