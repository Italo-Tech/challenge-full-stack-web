import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function seedUsers(prisma: PrismaClient) {
  console.log('👤 Criando usuários...');

  const hashedPassword = await bcrypt.hash('123456', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@edtech.com' },
    update: {},
    create: {
      email: 'admin@edtech.com',
      password: hashedPassword,
      name: 'Administrador',
    },
  });

  console.log('✅ Usuário admin criado:', admin.email);
}
