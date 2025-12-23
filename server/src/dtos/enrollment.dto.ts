import { z } from 'zod';

// DTO to create registration
export const createEnrollmentDTO = z.object({
  studentId: z.string().uuid('Student ID deve ser um UUID válido'),
  classId: z.string().uuid('Class ID deve ser um UUID válido'),
});

export type CreateEnrollmentDTO = z.infer<typeof createEnrollmentDTO>;

// DTO to update registration status
export const updateEnrollmentStatusDTO = z.object({
  status: z.enum(['ACTIVE', 'CANCELED'], {
    errorMap: () => ({ message: 'Status deve ser ACTIVE ou CANCELED' }),
  }),
});

export type UpdateEnrollmentStatusDTO = z.infer<typeof updateEnrollmentStatusDTO>;

// DTO for enrollment response
export interface EnrollmentResponseDTO {
  id: string;
  studentId: string;
  classId: string;
  enrolledAt: Date;
  status: 'ACTIVE' | 'CANCELED';
  student?: {
    id: string;
    name: string;
    email: string;
    ra: string;
  };
  class?: {
    id: string;
    name: string;
    course: {
      id: string;
      name: string;
    };
  };
}
