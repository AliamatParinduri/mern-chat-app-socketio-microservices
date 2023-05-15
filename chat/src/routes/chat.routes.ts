import {
  accessChat,
  addToGroup,
  createGroupChat,
  getChats,
  updateLastestMessage,
  renameGroup,
  removeFromGroup,
  getChatById
} from '../controller'
import { payloadMustInJSON, requireLogin } from '../middlewares'
import { BaseRoutes } from './base.route'

class ChatRoutes extends BaseRoutes {
  routes() {
    this.router.get('/', requireLogin, getChats)
    this.router.get('/:id', requireLogin, getChatById)
    this.router.post('/', requireLogin, payloadMustInJSON, accessChat)
    this.router.post('/group', requireLogin, payloadMustInJSON, createGroupChat)
    this.router.put('/:id/latest-message', requireLogin, payloadMustInJSON, updateLastestMessage)
    this.router.put('/rename/group', requireLogin, payloadMustInJSON, renameGroup)
    this.router.put('/add/group', requireLogin, payloadMustInJSON, addToGroup)
    this.router.put('/remove/group', requireLogin, payloadMustInJSON, removeFromGroup)
  }
}

export const chatRoutes = new ChatRoutes().router
