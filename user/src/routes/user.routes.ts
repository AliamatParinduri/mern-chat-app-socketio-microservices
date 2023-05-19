import UserController from '../controller/user.controller'
import { requireLogin } from '../middlewares'
import { BaseRoutes } from './base.route'
import { createChannel } from '../utils'

class UserRoutes extends BaseRoutes {
  async routes() {
    const channel = await createChannel()

    const c = new UserController(channel)

    this.router.get('/', requireLogin, c.getUsers)
  }
}

export const userRoutes = new UserRoutes().router
