import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateDTO } from '../middlewares/validate-dto.middleware';
import { createStudentDTO, updateStudentDTO } from '../dtos/student.dto';

const studentRoutes = Router();
const studentController = new StudentController();

// Authentication required
studentRoutes.use(authMiddleware);

// CRUD routes 
studentRoutes.post('/', validateDTO(createStudentDTO), (req, res) =>
  studentController.create(req, res)
);

studentRoutes.get('/', (req, res) => studentController.list(req, res));

studentRoutes.get('/:id', (req, res) => studentController.getById(req, res));

studentRoutes.put('/:id', validateDTO(updateStudentDTO), (req, res) =>
  studentController.update(req, res)
);

studentRoutes.delete('/:id', (req, res) => studentController.delete(req, res));

export { studentRoutes };
