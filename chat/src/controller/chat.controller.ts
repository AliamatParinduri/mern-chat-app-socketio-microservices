import { NextFunction, Request, Response } from 'express'

import { RPCObserver, UnprocessableEntityError, logger, subscribeMessage, validate } from '../utils'
import { AccessChatSchema, AddOrRemoveGroupChatSchema, CreateGroupChatSchema, RenameGroupChatSchema } from '../dto'
import ChatService from '../services/chat.service'

class ChatController {
  channel
  service = new ChatService()

  constructor(channel: any) {
    this.channel = channel
    subscribeMessage(channel, this.service)
    RPCObserver(channel, this.service)
  }

  getChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user
      const result = await this.service.getChats(this.channel, user)

      const message = 'Success get chat data'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }

  getChatById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id

      const result = await this.service.getChatById(id)

      const message = 'Success get chat data by id'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }

  accessChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user
      const body = req.body

      validate(body, AccessChatSchema)

      if (user._id === body.userId) {
        throw new UnprocessableEntityError('can not chat access to own user')
      }

      const result = await this.service.accessChat(this.channel, user, body.userId)

      const message = 'Success create new chat'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }

  createGroupChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user
      const body = req.body

      if (body.users < 2) {
        throw new UnprocessableEntityError('More than 2 users are required to form a group chat')
      }

      validate(body, CreateGroupChatSchema)

      const users = JSON.parse(body.users)
      users.push(user._id)

      const result = await this.service.createGroupChat(user._id, users, body.name)

      const message = 'Success create group chat'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }

  renameGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body

      validate(body, RenameGroupChatSchema)

      const result = await this.service.renameGroupChat(this.channel, body)

      const message = 'Success rename group chat'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }

  addToGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body

      validate(body, AddOrRemoveGroupChatSchema)

      const result = await this.service.addToGroupChat(this.channel, body)

      const message = 'Success add user to group chat'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }

  removeFromGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body

      validate(body, AddOrRemoveGroupChatSchema)

      const result = await this.service.removeFromGroupChat(this.channel, body)

      const message = 'Success remove user from group chat'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }
}

export default ChatController
