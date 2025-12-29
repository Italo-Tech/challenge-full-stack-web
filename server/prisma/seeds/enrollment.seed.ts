import { PrismaClient } from '@prisma/client';

export async function seedEnrollments(prisma: PrismaClient) {
  // Buscar 2 alunos e 2 turmas para criar matrículas
  const students = await prisma.student.findMany({
    where: { deletedAt: null },
    take: 2,
  });

  const classes = await prisma.class.findMany({
    where: { deletedAt: null },
    take: 2,
  });

  if (students.length < 2 || classes.length < 2) {
    console.log('⚠️  Não há alunos ou turmas suficientes para criar matrículas');
    return;
  }

  const enrollments = [
    {
      studentId: students[0].id,
      classId: classes[0].id,
      status: 'ACTIVE' as const,
    },
    {
      studentId: students[1].id,
      classId: classes[1].id,
      status: 'ACTIVE' as const,
    },
  ];

  for (const enrollment of enrollments) {
    await prisma.enrollment.upsert({
      where: {
        studentId_classId: {
          studentId: enrollment.studentId,
          classId: enrollment.classId,
        },
      },
      update: {},
      create: enrollment,
    });
  }

  console.log(`✅ ${enrollments.length} matrículas criadas com sucesso!`);
}
