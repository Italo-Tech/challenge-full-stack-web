export const mockClass = {
  id: 'class-123',
  courseId: 'course-123',
  name: 'Turma A - 2024',
  startDate: new Date('2024-03-01'),
  endDate: new Date('2024-12-20'),
  createdAt: new Date('2024-01-15'),
  course: { id: 'course-123', name: 'Curso Teste' },
  enrollments: [],
} as any;

export const mockClassList = [
  mockClass,
  {
    id: 'class-456',
    courseId: 'course-123',
    name: 'Turma B - 2024',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-12-20'),
    createdAt: new Date('2024-01-16'),
    course: { id: 'course-123', name: 'Curso Teste' },
    enrollments: [],
  },
] as any;

export const mockCreateClassDTO = {
  courseId: 'course-123',
  name: 'Turma C - 2024',
  startDate: '2024-06-01',
  endDate: '2024-12-20',
} as any;
