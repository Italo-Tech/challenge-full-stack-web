import { ClassRepository } from '../../repositories/class.repository';
import { AppError } from '../../utils/app-error';

export class DeleteClassUseCase {
  constructor(private classRepository: ClassRepository) {}

  async execute(id: string) {
    const classEntity = await this.classRepository.findById(id);

    if (!classEntity) {
      throw new AppError('Turma não encontrada', 404);
    }

    await this.classRepository.delete(id);
  }
}
