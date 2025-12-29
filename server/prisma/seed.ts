import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/user.seed';
import { seedStudents } from './seeds/student.seed';
import { seedCourses } from './seeds/course.seed';
import { seedClasses } from './seeds/class.seed';
import { seedEnrollments } from './seeds/enrollment.seed';

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  console.log('');

  await seedStudents(prisma);
  console.log('');

  await seedCourses(prisma);

  await seedClasses(prisma);
  console.log('');

  await seedEnrollments(prisma);

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
