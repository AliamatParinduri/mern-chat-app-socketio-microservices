import { NextFunction, Request, Response } from 'express'

import UserService from '../services/user.service'
import { RPCObserver, logger } from '../utils'

class UserController {
  channel
  service = new UserService()

  constructor(channel: any) {
    this.channel = channel
    RPCObserver(channel, this.service)
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user
      const result = await this.service.getUsers(req, user)

      const message = 'Success get user data'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }
}

export default UserController
