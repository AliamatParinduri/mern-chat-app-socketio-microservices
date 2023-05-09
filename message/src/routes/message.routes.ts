import { getMessages, sendMessage } from '../controller'
import { payloadMustInJSON, requireLogin } from '../middlewares'
import { BaseRoutes } from './base.route'

class MessageRoutes extends BaseRoutes {
  routes() {
    this.router.post('/', requireLogin, payloadMustInJSON, sendMessage)
    this.router.get('/:chatId', requireLogin, getMessages)
  }
}

export const messageRoutes = new MessageRoutes().router
