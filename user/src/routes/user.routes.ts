import { detailsUsers, getUsers } from '../controller'
import { requireLogin } from '../middlewares'
import { BaseRoutes } from './base.route'

class UserRoutes extends BaseRoutes {
  routes() {
    this.router.get('/', requireLogin, getUsers)
    this.router.get('/:userId/detail-with-userlogin', requireLogin, detailsUsers)
  }
}

export const userRoutes = new UserRoutes().router
