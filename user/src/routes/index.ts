import { Application } from 'express'
import { userRoutes } from './user.routes'
import { authRoutes } from './auth.routes'

const routes = (app: Application) => {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', userRoutes)
}

export default routes
