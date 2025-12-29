import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/user.seed';
import { seedStudents } from './seeds/student.seed';
import { seedCourses } from './seeds/course.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  // Seed de usuários
  await seedUsers(prisma);
  console.log('');

  // Seed de estudantes
  await seedStudents(prisma);
  console.log('');

  // Seed de cursos
  await seedCourses(prisma);
  console.log('');

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
