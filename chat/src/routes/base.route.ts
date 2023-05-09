import { Router } from 'express'

export abstract class BaseRoutes {
  router: Router
  constructor() {
    this.router = Router()
    this.routes()
  }

  routes() {}
}
