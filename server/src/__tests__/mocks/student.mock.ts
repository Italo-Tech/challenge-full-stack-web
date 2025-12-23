export const mockStudent = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'João Silva',
  email: 'joao.silva@test.com',
  ra: 'RA123456',
  cpf: '12345678901',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockStudentList = [
  mockStudent,
  {
    id: '223e4567-e89b-12d3-a456-426614174001',
    name: 'Maria Santos',
    email: 'maria.santos@test.com',
    ra: 'RA123457',
    cpf: '12345678902',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: '323e4567-e89b-12d3-a456-426614174002',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@test.com',
    ra: 'RA123458',
    cpf: '12345678903',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

export const mockCreateStudentDTO = {
  name: 'Carlos Eduardo',
  email: 'carlos.eduardo@test.com',
  ra: 'RA999999',
  cpf: '99999999999',
};

export const mockUpdateStudentDTO = {
  name: 'João Silva Atualizado',
  email: 'joao.updated@test.com',
};
