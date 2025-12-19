import { Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user.use-case';

export class AuthController {
  async login(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

    const result = await authenticateUserUseCase.execute(req.body);

    return res.json(result);
  }
}
