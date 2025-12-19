import { z } from 'zod';

export const loginDTO = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export type LoginDTO = z.infer<typeof loginDTO>;

export interface AuthResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}
