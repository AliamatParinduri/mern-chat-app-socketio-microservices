import { createChannel } from '../utils'
import ChatController from '../controller/chat.controller'
import { payloadMustInJSON, requireLogin } from '../middlewares'
import { BaseRoutes } from './base.route'

class ChatRoutes extends BaseRoutes {
  async routes() {
    const channel = await createChannel()

    const c = new ChatController(channel)

    this.router.get('/', requireLogin, c.getChats)
    this.router.get('/:id', requireLogin, c.getChatById)
    this.router.post('/', requireLogin, payloadMustInJSON, c.accessChat)
    this.router.post('/group', requireLogin, payloadMustInJSON, c.createGroupChat)
    this.router.put('/rename/group', requireLogin, payloadMustInJSON, c.renameGroup)
    this.router.put('/add/group', requireLogin, payloadMustInJSON, c.addToGroup)
    this.router.put('/remove/group', requireLogin, payloadMustInJSON, c.removeFromGroup)
  }
}

export const chatRoutes = new ChatRoutes().router
