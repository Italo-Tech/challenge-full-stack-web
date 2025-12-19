import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { studentRoutes } from './student.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/students', studentRoutes);

export { routes };
