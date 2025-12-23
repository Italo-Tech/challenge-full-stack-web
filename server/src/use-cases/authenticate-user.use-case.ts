import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { LoginDTO, AuthResponseDTO } from '../dtos/auth.dto';
import { AppError } from '../utils/app-error';

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: LoginDTO): Promise<AuthResponseDTO> {
    // Search email
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect email or password.', 401);
    }

    // Generate JWT token
    const payload = { userId: user.id };
    const secret = process.env.JWT_SECRET || 'secret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn as any });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
