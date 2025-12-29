export interface Student {
  id: string
  name: string
  email: string
  ra: string
  cpf: string
  createdAt: string
  updatedAt: string
}

export interface CreateStudentDTO {
  name: string
  email: string
  ra: string
  cpf: string
}

export interface UpdateStudentDTO {
  name?: string
  email?: string
}

export interface Course {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface CreateCourseDTO {
  name: string
  description?: string
}

export interface UpdateCourseDTO {
  name?: string
  description?: string
}

export interface Class {
  id: string
  name: string
  courseId: string
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  course?: Course
  enrollments?: Array<{
    id: string
    studentId: string
    classId: string
    status: 'ACTIVE' | 'CANCELED'
  }>
}

export interface CreateClassDTO {
  name: string
  courseId: string
  startDate: string
  endDate: string
}

export interface UpdateClassDTO {
  name?: string
  startDate?: string
  endDate?: string
}

export interface Enrollment {
  id: string
  studentId: string
  classId: string
  status: 'ACTIVE' | 'CANCELED'
  enrolledAt: string
  student?: {
    id: string
    name: string
    email: string
    ra: string
  }
  class?: {
    id: string
    name: string
    course?: {
      id: string
      name: string
    }
  }
}

export interface CreateEnrollmentDTO {
  studentId: string
  classId: string
  status?: 'ACTIVE' | 'CANCELED'
}

export interface UpdateEnrollmentDTO {
  status: 'ACTIVE' | 'CANCELED'
}

export interface LoginDTO {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}
