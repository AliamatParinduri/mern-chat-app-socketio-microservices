import { getUsers } from '../controller'
import { requireLogin } from '../middlewares'
import { BaseRoutes } from './base.route'

class UserRoutes extends BaseRoutes {
  routes() {
    this.router.get('/', requireLogin, getUsers)
  }
}

export const userRoutes = new UserRoutes().router
