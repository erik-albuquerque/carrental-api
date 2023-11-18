import { Repository } from 'typeorm'

import { connection } from '../../../database'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = connection.getRepository(User)
  }

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
    })

    await this.repository.save(user)
  }
}

export { UsersRepository }
