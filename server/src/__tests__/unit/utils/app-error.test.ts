import { AppError } from '../../../utils/app-error';

describe('AppError', () => {
  it('deve criar erro com mensagem e status code', () => {
    // Arrange & Act
    const error = new AppError('Erro de teste', 404);

    // Assert
    expect(error.message).toBe('Erro de teste');
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('AppError');
  });

  it('deve ter status code padrão 400', () => {
    // Arrange & Act
    const error = new AppError('Erro sem status code');

    // Assert
    expect(error.message).toBe('Erro sem status code');
    expect(error.statusCode).toBe(400);
  });

  it('deve ser instância de Error', () => {
    // Arrange & Act
    const error = new AppError('Erro de teste', 500);

    // Assert
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
  });

  it('deve aceitar diferentes status codes', () => {
    // Arrange & Act
    const error400 = new AppError('Bad Request', 400);
    const error401 = new AppError('Unauthorized', 401);
    const error404 = new AppError('Not Found', 404);
    const error409 = new AppError('Conflict', 409);
    const error500 = new AppError('Internal Server Error', 500);

    // Assert
    expect(error400.statusCode).toBe(400);
    expect(error401.statusCode).toBe(401);
    expect(error404.statusCode).toBe(404);
    expect(error409.statusCode).toBe(409);
    expect(error500.statusCode).toBe(500);
  });

  it('deve ser possível lançar como exceção', () => {
    // Arrange
    const throwError = () => {
      throw new AppError('Erro lançado', 403);
    };

    // Act & Assert
    expect(throwError).toThrow(AppError);
    expect(throwError).toThrow('Erro lançado');
  });
});
