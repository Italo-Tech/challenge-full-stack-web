import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { studentRoutes } from './student.routes';
import { courseRoutes } from './course.routes';
import { classRoutes } from './class.routes';
import { enrollmentRoutes } from './enrollment.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/students', studentRoutes);
routes.use('/courses', courseRoutes);
routes.use('/classes', classRoutes);
routes.use('/enrollments', enrollmentRoutes);

export { routes };
