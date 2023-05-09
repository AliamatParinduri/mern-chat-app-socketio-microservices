import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import { BaseError, NotFoundError } from './utils'
import routes from './routes'

const app: Application = express()

app.use(cors())
app.use(express.json())

routes(app)

app.get('/app-version', (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    author: 'Aliamat Parinduri',
    version: '0.1.0'
  })
})

app.use((req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError('Page Not Found!')
})

app.use((err: BaseError, req: Request, res: Response, next: NextFunction) => {
  const message: string = err.message
  const description: string = err?.description
  const statusCode: number = err.statusCode ?? 500

  return res.status(statusCode).json({ status: 'error', message, description })
})

export default app
