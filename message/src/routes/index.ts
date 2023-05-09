import { Application } from 'express'
import { messageRoutes } from './message.routes'

const routes = (app: Application) => {
  app.use('/api/v1/message', messageRoutes)
}

export default routes
