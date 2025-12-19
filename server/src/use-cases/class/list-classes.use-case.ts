import { ClassRepository } from '../../repositories/class.repository';

export class ListClassesUseCase {
  constructor(private classRepository: ClassRepository) {}

  async execute() {
    const classes = await this.classRepository.findAll();
    return classes;
  }
}
