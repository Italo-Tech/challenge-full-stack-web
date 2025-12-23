import { Router } from 'express';
import { EnrollmentController } from '../controllers/enrollment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateDTO } from '../middlewares/validate-dto.middleware';
import { createEnrollmentDTO } from '../dtos/enrollment.dto';

const enrollmentRoutes = Router();
const enrollmentController = new EnrollmentController();

// All registration routes require authentication.
enrollmentRoutes.use(authMiddleware);

// Routes
enrollmentRoutes.post('/', validateDTO(createEnrollmentDTO), (req, res) =>
  enrollmentController.create(req, res)
);

enrollmentRoutes.get('/', (req, res) => enrollmentController.list(req, res));

enrollmentRoutes.patch('/:id/cancel', (req, res) => enrollmentController.cancel(req, res));

export { enrollmentRoutes };
