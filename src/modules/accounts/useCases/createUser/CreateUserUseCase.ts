import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const retrievedUser = await this.usersRepository.findByEmail(email)

    if (retrievedUser) {
      throw new AppError('User already exists!')
    }

    const encryptedPassword = await hash(password, 8)

    await this.usersRepository.create({
      name,
      password: encryptedPassword,
      email,
      driver_license,
    })
  }
}

export { CreateUserUseCase }
