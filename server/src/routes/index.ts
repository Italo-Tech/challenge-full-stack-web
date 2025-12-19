import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { studentRoutes } from './student.routes';
import { courseRoutes } from './course.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/students', studentRoutes);
routes.use('/courses', courseRoutes);

export { routes };
