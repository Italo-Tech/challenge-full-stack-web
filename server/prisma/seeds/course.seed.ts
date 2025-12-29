import { PrismaClient } from '@prisma/client';

export async function seedCourses(prisma: PrismaClient) {
  const courses = [
    {
      name: 'Engenharia de Software',
      description: 'Curso completo sobre desenvolvimento de software, metodologias ágeis, arquitetura de sistemas e boas práticas de programação.',
    },
    {
      name: 'Ciência da Computação',
      description: 'Formação ampla em computação, incluindo algoritmos, estruturas de dados, sistemas operacionais e teoria da computação.',
    },
    {
      name: 'Análise e Desenvolvimento de Sistemas',
      description: 'Curso focado no desenvolvimento de aplicações, modelagem de sistemas e gestão de projetos de TI.',
    },
    {
      name: 'Segurança da Informação',
      description: 'Especialização em proteção de dados, criptografia, segurança de redes e gestão de riscos cibernéticos.',
    },
    {
      name: 'Ciência de Dados',
      description: 'Curso sobre análise de dados, machine learning, estatística aplicada e visualização de informações.',
    },
    {
      name: 'Inteligência Artificial',
      description: 'Estudo de algoritmos de IA, deep learning, processamento de linguagem natural e visão computacional.',
    },
    {
      name: 'Desenvolvimento Web Full Stack',
      description: 'Formação completa em desenvolvimento web, incluindo frontend, backend, bancos de dados e DevOps.',
    },
    {
      name: 'Desenvolvimento Mobile',
      description: 'Curso focado em criação de aplicativos para iOS e Android, usando tecnologias nativas e híbridas.',
    },
    {
      name: 'Banco de Dados',
      description: 'Estudo aprofundado de sistemas de gerenciamento de banco de dados, modelagem, SQL e NoSQL.',
    },
    {
      name: 'Redes de Computadores',
      description: 'Curso sobre arquitetura de redes, protocolos de comunicação, administração e segurança de redes.',
    },
    {
      name: 'DevOps e Cloud Computing',
      description: 'Formação em práticas DevOps, infraestrutura como código, containers e computação em nuvem.',
    },
    {
      name: 'Gestão de Projetos de TI',
      description: 'Curso sobre metodologias de gestão, Scrum, Kanban, planejamento e acompanhamento de projetos tecnológicos.',
    },
    {
      name: 'UX/UI Design',
      description: 'Estudo de experiência do usuário, design de interfaces, prototipagem e usabilidade de sistemas.',
    },
    {
      name: 'Jogos Digitais',
      description: 'Curso completo sobre desenvolvimento de jogos, engines, programação gráfica e game design.',
    },
    {
      name: 'Internet das Coisas (IoT)',
      description: 'Formação em sistemas embarcados, sensores, conectividade e desenvolvimento de soluções IoT.',
    },
  ];

  await prisma.course.createMany({
    data: courses,
    skipDuplicates: true,
  });

  console.log(`✅ ${courses.length} cursos criados com sucesso!`);
}
