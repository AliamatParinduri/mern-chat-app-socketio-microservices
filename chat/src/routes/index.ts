import { Application } from 'express'

import { chatRoutes } from './chat.routes'

const routes = (app: Application) => {
  app.use('/api/v1/chat', chatRoutes)
}

export default routes
