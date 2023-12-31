import { inject, injectable } from 'tsyringe'

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequestPayload {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequestPayload): Promise<void> {
    const retrievedSpecification =
      await this.specificationRepository.findByName(name)

    if (retrievedSpecification) {
      throw new AppError('Specification already exists!')
    }

    await this.specificationRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }
