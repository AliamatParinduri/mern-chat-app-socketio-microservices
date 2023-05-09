import { payloadMustInJSON } from '../middlewares'
import { login, register } from '../controller'
import { BaseRoutes } from './base.route'

class AuthRoutes extends BaseRoutes {
  routes() {
    this.router.post('/register', payloadMustInJSON, register)
    this.router.post('/login', payloadMustInJSON, login)
  }
}

export const authRoutes = new AuthRoutes().router
