import { PrismaClient } from '@prisma/client';

export async function seedClasses(prisma: PrismaClient) {
  const courses = await prisma.course.findMany({
    where: { deletedAt: null },
    take: 2,
  });

  const classes = [
    {
      name: 'Turma A - Matutino 2026',
      courseId: courses[0].id,
      startDate: new Date('2026-02-01T00:00:00.000Z'),
      endDate: new Date('2026-06-30T00:00:00.000Z'),
    },
    {
      name: 'Turma B - Noturno 2026',
      courseId: courses[1].id,
      startDate: new Date('2026-03-15T00:00:00.000Z'),
      endDate: new Date('2026-11-30T00:00:00.000Z'),
    },
  ];

  await prisma.class.createMany({
    data: classes,
    skipDuplicates: true,
  });

  console.log(`✅ ${classes.length} turmas criadas com sucesso!`);
}

