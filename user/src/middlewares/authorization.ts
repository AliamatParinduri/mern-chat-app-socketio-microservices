import { NextFunction, Request, Response } from 'express'

import { UnauthorizedError, logger, verifyToken } from '../utils'

export const requireLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization

    if (!accessToken) {
      logger.error('ERR = Auth - check authorization headers')
      throw new UnauthorizedError('Request token not send by user!')
    }
    const [isBearer, token] = accessToken.split(' ')

    if (isBearer !== 'Bearer') {
      logger.error('ERR = Auth - check type Bearer')
      throw new UnauthorizedError('unAuthorized!')
    }
    if (!token) {
      logger.error('ERR = Auth - check Token')
      throw new UnauthorizedError('unAuthorized!')
    }

    const user = verifyToken(token)
    if (!user) {
      logger.error('ERR = Auth - user not found')
      throw new UnauthorizedError('user not found!')
    }

    res.locals.user = user
    next()
  } catch (err) {
    next(err)
  }
}
