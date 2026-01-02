export const mockCourse = {
  id: 'course-123',
  name: 'Engenharia de Software',
  description: 'Curso completo de Engenharia de Software',
  createdAt: new Date('2024-01-01'),
  deletedAt: null,
  classes: [],
};

export const mockCourseList = [
  mockCourse,
  {
    id: 'course-456',
    name: 'Ciência da Computação',
    description: 'Curso de Ciência da Computação',
    createdAt: new Date('2024-01-02'),
    deletedAt: null,
    classes: [],
  },
];

export const mockCreateCourseDTO = {
  name: 'Análise e Desenvolvimento de Sistemas',
  description: 'Curso de ADS',
};
