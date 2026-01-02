export const mockUser = {
  id: 'user-123',
  email: 'admin@test.com',
  password: '$2a$10$hashedpassword', // Hash de "123456"
  name: 'Admin Test',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  deletedAt: null,
};

export const mockLoginDTO = {
  email: 'admin@test.com',
  password: '123456',
};

export const mockAuthResponse = {
  token: 'mock-jwt-token',
  user: {
    id: mockUser.id,
    email: mockUser.email,
    name: mockUser.name,
  },
};
