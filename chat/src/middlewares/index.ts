import { NextFunction, Request, Response } from 'express'

import { BadRequestError } from '../utils'

export * from './authorization'

export const payloadMustInJSON = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['content-type'] !== 'application/json') {
    throw new BadRequestError('Content-Type must be in json format')
  }
  next()
}
