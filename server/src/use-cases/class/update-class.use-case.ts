import { ClassRepository } from '../../repositories/class.repository';
import { UpdateClassDTO } from '../../dtos/class.dto';
import { AppError } from '../../utils/app-error';

export class UpdateClassUseCase {
  constructor(private classRepository: ClassRepository) {}

  async execute(id: string, data: UpdateClassDTO) {
    const classEntity = await this.classRepository.findById(id);

    if (!classEntity) {
      throw new AppError('Turma não encontrada', 404);
    }

    const updatedClass = await this.classRepository.update(id, data);
    
    // Serializar datas para evitar problemas de timezone
    return {
      ...updatedClass,
      startDate: updatedClass.startDate.toISOString().split('T')[0],
      endDate: updatedClass.endDate.toISOString().split('T')[0],
    };
  }
}
