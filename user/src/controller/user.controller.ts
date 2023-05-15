import { NextFunction, Request, Response } from 'express'

import { userService } from '../services'
import { logger } from '../utils'

class UserController {
  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user
      const result = await userService.getUsers(req, user)

      const message = 'Success get user data'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }

  detailsUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = req.params.users

      const result = await userService.detailsUsers(JSON.parse(users))

      logger.info('Success get details user data')
      return res.status(200).json(result)
    } catch (err: any) {
      next(err)
    }
  }
}

export const { getUsers, detailsUsers } = new UserController()
