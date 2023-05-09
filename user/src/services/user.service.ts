import { Request } from 'express'

import { userRepository } from '../repository'
import { UserDTO } from '../dto'
import { NotFoundError } from '../utils'

class UserService {
  getUsers = async (req: Request, user: UserDTO) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
          ]
        }
      : {}

    const result = await userRepository.getUsers(keyword, user)

    if (result.length < 1) {
      throw new NotFoundError('Users Not Found')
    }
    return result
  }
}

export const userService = new UserService()
