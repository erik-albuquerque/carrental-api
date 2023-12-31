import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoryRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoryRepositoryInMemory

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoryRepositoryInMemory()

    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'category test',
      description: 'category description test',
    }

    await createCategoryUseCase.execute(category)

    const retrievedCategory = await categoriesRepositoryInMemory.findByName(
      category.name,
    )

    expect(retrievedCategory).toHaveProperty('id')
  })

  it('should not be able to create duplicate category', async () => {
    expect(async () => {
      const category = {
        name: 'category test',
        description: 'category description test',
      }

      await createCategoryUseCase.execute(category)
      await createCategoryUseCase.execute(category)
    }).rejects.toBeInstanceOf(AppError)
  })
})
