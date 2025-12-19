import { z } from 'zod';

// DTO to create course
export const createCourseDTO = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
});

export type CreateCourseDTO = z.infer<typeof createCourseDTO>;

// DTO to updated course
export const updateCourseDTO = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  description: z.string().optional(),
});

export type UpdateCourseDTO = z.infer<typeof updateCourseDTO>;

// DTO for course response
export interface CourseResponseDTO {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
}
