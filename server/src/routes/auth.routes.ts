import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateDTO } from '../middlewares/validate-dto.middleware';
import { loginDTO } from '../dtos/auth.dto';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/login', validateDTO(loginDTO), (req, res) =>
  authController.login(req, res)
);

export { authRoutes };
