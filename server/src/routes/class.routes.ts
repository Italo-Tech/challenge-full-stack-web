import { Router } from 'express';
import { ClassController } from '../controllers/class.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateDTO } from '../middlewares/validate-dto.middleware';
import { createClassDTO } from '../dtos/class.dto';

const classRoutes = Router();
const classController = new ClassController();

// All class routes require authentication.
classRoutes.use(authMiddleware);

// CRUD routes
classRoutes.post('/', validateDTO(createClassDTO), (req, res) =>
  classController.create(req, res)
);

classRoutes.get('/', (req, res) => classController.list(req, res));

export { classRoutes };
