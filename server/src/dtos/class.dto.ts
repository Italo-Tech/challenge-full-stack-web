import { z } from 'zod';

// DTO to create a class
export const createClassDTO = z.object({
  courseId: z.string().uuid('Course ID deve ser um UUID válido'),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de início deve estar no formato YYYY-MM-DD'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de término deve estar no formato YYYY-MM-DD'),
});

export type CreateClassDTO = z.infer<typeof createClassDTO>;

// DTO to update class
export const updateClassDTO = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de início deve estar no formato YYYY-MM-DD').optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de término deve estar no formato YYYY-MM-DD').optional(),
});

export type UpdateClassDTO = z.infer<typeof updateClassDTO>;

// DTO for class response
export interface ClassResponseDTO {
  id: string;
  courseId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  course?: {
    id: string;
    name: string;
  };
}
