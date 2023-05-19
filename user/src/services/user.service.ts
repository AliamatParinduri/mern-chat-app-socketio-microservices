import { Request } from 'express'
import { Op } from 'sequelize'

import { userRepository } from '../repository'
import { UserDTO } from '../dto'
import { NotFoundError } from '../utils'

class UserService {
  async serveRPCRequest(payload: any) {
    const { event, data } = payload

    switch (event) {
      case 'DETAIL_USERS':
        return this.detailsUsers(data.users)

      default:
        break
    }
  }

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

  detailsUsers = async (users: []) => {
    const data: any[] = []

    for (const user of users) {
      const userDetail = await userRepository.findById(user)
      data.push(userDetail.dataValues)
    }

    return data
  }
}

export default UserService
