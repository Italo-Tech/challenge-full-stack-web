import { AuthenticateUserUseCase } from '../../../use-cases/authenticate-user.use-case';
import { UserRepository } from '../../../repositories/user.repository';
import { AppError } from '../../../utils/app-error';
import { mockUser, mockLoginDTO } from '../../mocks/auth.mock';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock das bibliotecas externas
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthenticateUserUseCase', () => {
  let userRepository: jest.Mocked<UserRepository>;
  let sut: AuthenticateUserUseCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    } as any;

    sut = new AuthenticateUserUseCase(userRepository);

    // Reset dos mocks
    jest.clearAllMocks();
  });

  it('deve autenticar usuário com credenciais válidas', async () => {
    // Arrange
    const mockToken = 'mock-jwt-token';
    userRepository.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    // Act
    const result = await sut.execute(mockLoginDTO);

    // Assert
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
    expect(result.user).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
    });
    expect(userRepository.findByEmail).toHaveBeenCalledWith(mockLoginDTO.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginDTO.password, mockUser.password);
  });

  it('deve retornar token JWT válido', async () => {
    // Arrange
    const mockToken = 'mock-jwt-token-12345';
    userRepository.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    // Act
    const result = await sut.execute(mockLoginDTO);

    // Assert
    expect(result.token).toBe(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: mockUser.id },
      expect.any(String),
      expect.any(Object)
    );
  });

  it('deve lançar erro 401 se email não existe', async () => {
    // Arrange
    userRepository.findByEmail.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(mockLoginDTO)).rejects.toThrow(AppError);
    await expect(sut.execute(mockLoginDTO)).rejects.toMatchObject({
      message: 'Incorrect email or password.',
      statusCode: 401,
    });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it('deve lançar erro 401 se senha está incorreta', async () => {
    // Arrange
    userRepository.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    // Act & Assert
    await expect(sut.execute(mockLoginDTO)).rejects.toThrow(AppError);
    await expect(sut.execute(mockLoginDTO)).rejects.toMatchObject({
      message: 'Incorrect email or password.',
      statusCode: 401,
    });
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it('deve verificar senha usando bcrypt', async () => {
    // Arrange
    userRepository.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('token');

    // Act
    await sut.execute(mockLoginDTO);

    // Assert
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginDTO.password, mockUser.password);
  });

  it('não deve retornar senha do usuário na resposta', async () => {
    // Arrange
    userRepository.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('token');

    // Act
    const result = await sut.execute(mockLoginDTO);

    // Assert
    expect(result.user).not.toHaveProperty('password');
    expect(result.user).toHaveProperty('id');
    expect(result.user).toHaveProperty('email');
    expect(result.user).toHaveProperty('name');
  });

  it('deve buscar usuário por email antes de verificar senha', async () => {
    // Arrange
    userRepository.findByEmail.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('token');

    // Act
    await sut.execute(mockLoginDTO);

    // Assert
    expect(userRepository.findByEmail).toHaveBeenCalled();
    expect(bcrypt.compare).toHaveBeenCalled();
  });
});
