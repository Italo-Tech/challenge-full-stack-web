import { z } from 'zod';

// CPF validation (numbers only, 11 digits)
const cpfRegex = /^\d{11}$/;

// DTO to create student
export const createStudentDTO = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  ra: z.string().min(5, 'RA deve ter no mínimo 5 caracteres'),
  cpf: z.string().regex(cpfRegex, 'CPF deve conter apenas 11 dígitos'),
});

export type CreateStudentDTO = z.infer<typeof createStudentDTO>;

// DTO to update student
export const updateStudentDTO = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
});

export type UpdateStudentDTO = z.infer<typeof updateStudentDTO>;

// DTO for student response
export interface StudentResponseDTO {
  id: string;
  name: string;
  email: string;
  ra: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
}
