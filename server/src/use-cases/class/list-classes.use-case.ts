import { ClassRepository } from '../../repositories/class.repository';

export class ListClassesUseCase {
  constructor(private classRepository: ClassRepository) {}

  async execute() {
    const classes = await this.classRepository.findAll();
    
    // Serializar datas para evitar problemas de timezone
    return classes.map(classItem => ({
      ...classItem,
      startDate: classItem.startDate.toISOString().split('T')[0],
      endDate: classItem.endDate.toISOString().split('T')[0],
    }));
  }
}
