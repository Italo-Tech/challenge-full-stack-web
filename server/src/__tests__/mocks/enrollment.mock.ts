export const mockEnrollment = {
  id: 'enrollment-123',
  studentId: 'student-123',
  classId: 'class-123',
  enrolledAt: new Date('2024-02-01'),
  status: 'ACTIVE' as const,
  student: { id: 'student-123', name: 'Student Test', email: 'student@test.com', ra: 'RA123' },
  class: { id: 'class-123', name: 'Turma A', course: { id: 'course-123', name: 'Curso Test' } },
} as any;

export const mockEnrollmentList = [
  mockEnrollment,
  {
    id: 'enrollment-456',
    studentId: 'student-456',
    classId: 'class-123',
    enrolledAt: new Date('2024-02-02'),
    status: 'ACTIVE' as const,
    student: { id: 'student-456', name: 'Student 2', email: 'student2@test.com', ra: 'RA456' },
    class: { id: 'class-123', name: 'Turma A', course: { id: 'course-123', name: 'Curso Test' } },
  },
  {
    id: 'enrollment-789',
    studentId: 'student-789',
    classId: 'class-456',
    enrolledAt: new Date('2024-02-03'),
    status: 'CANCELED' as const,
    student: { id: 'student-789', name: 'Student 3', email: 'student3@test.com', ra: 'RA789' },
    class: { id: 'class-456', name: 'Turma B', course: { id: 'course-123', name: 'Curso Test' } },
  },
] as any;

export const mockCreateEnrollmentDTO = {
  studentId: 'student-999',
  classId: 'class-999',
};
