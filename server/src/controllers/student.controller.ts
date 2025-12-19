import { Request, Response } from 'express';
import { StudentRepository } from '../repositories/student.repository';
import { CreateStudentUseCase } from '../use-cases/student/create-student.use-case';
import { ListStudentsUseCase } from '../use-cases/student/list-students.use-case';
import { GetStudentByIdUseCase } from '../use-cases/student/get-student-by-id.use-case';
import { UpdateStudentUseCase } from '../use-cases/student/update-student.use-case';
import { DeleteStudentUseCase } from '../use-cases/student/delete-student.use-case';

export class StudentController {
  async create(req: Request, res: Response) {
    const studentRepository = new StudentRepository();
    const createStudentUseCase = new CreateStudentUseCase(studentRepository);

    const student = await createStudentUseCase.execute(req.body);

    return res.status(201).json(student);
  }

  async list(req: Request, res: Response) {
    const studentRepository = new StudentRepository();
    const listStudentsUseCase = new ListStudentsUseCase(studentRepository);

    const students = await listStudentsUseCase.execute();

    return res.json(students);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const studentRepository = new StudentRepository();
    const getStudentByIdUseCase = new GetStudentByIdUseCase(studentRepository);

    const student = await getStudentByIdUseCase.execute(id);

    return res.json(student);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const studentRepository = new StudentRepository();
    const updateStudentUseCase = new UpdateStudentUseCase(studentRepository);

    const student = await updateStudentUseCase.execute(id, req.body);

    return res.json(student);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const studentRepository = new StudentRepository();
    const deleteStudentUseCase = new DeleteStudentUseCase(studentRepository);

    await deleteStudentUseCase.execute(id);

    return res.status(204).send();
  }
}
