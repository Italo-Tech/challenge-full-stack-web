import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateDTO } from '../middlewares/validate-dto.middleware';
import { createCourseDTO } from '../dtos/course.dto';

const courseRoutes = Router();
const courseController = new CourseController();

// All course paths require authentication.
courseRoutes.use(authMiddleware);

// CRUD Routes
courseRoutes.post('/', validateDTO(createCourseDTO), (req, res) =>
  courseController.create(req, res)
);

courseRoutes.get('/', (req, res) => courseController.list(req, res));

export { courseRoutes };
