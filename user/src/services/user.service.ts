import { Request } from 'express'
import { Op } from 'sequelize'

import { userRepository } from '../repository'
import { UserDTO } from '../dto'
import { NotFoundError } from '../utils'

class UserService {
  getUsers = async (req: Request, user: UserDTO) => {
    const keyword = req.query.search
      ? {
          [Op.or]: [{ name: { [Op.iRegexp]: req.query.search } }, { email: { [Op.iRegexp]: req.query.search } }]
        }
      : {}

    const result = await userRepository.getUsers(keyword, user)

    if (result.length < 1) {
      throw new NotFoundError('Users Not Found')
    }
    return result
  }

  detailsUsers = async (id: string, userId: string) => {
    const user1 = await userRepository.findById(id)
    const user2 = await userRepository.findById(userId)

    return [user1, user2]
  }
}

export const userService = new UserService()
