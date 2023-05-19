import MessageController from '../controller/message.controller'
import { createChannel } from '../utils'
import { payloadMustInJSON, requireLogin } from '../middlewares'
import { BaseRoutes } from './base.route'

class MessageRoutes extends BaseRoutes {
  async routes() {
    const channel = await createChannel()

    const c = new MessageController(channel)

    this.router.post('/', requireLogin, payloadMustInJSON, c.sendMessage)
    this.router.get('/:chatId', requireLogin, c.getMessages)
  }
}

export const messageRoutes = new MessageRoutes().router
