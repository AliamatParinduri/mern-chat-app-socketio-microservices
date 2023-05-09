import { NextFunction, Request, Response } from 'express'

import { UnprocessableEntityError, logger, validate } from '../utils'
import { AccessChatSchema, AddOrRemoveGroupChatSchema, CreateGroupChatSchema, RenameGroupChatSchema } from '../dto'
import { chatService } from '../services'

class ChatController {
  getChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user
      const result = await chatService.getChats(user)

      const message = 'Success get chat data'
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

      const result = await chatService.accessChat(user, body.userId)

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
      users.push(user)

      const result = await chatService.createGroupChat(user, users, body.name)

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

      const result = await chatService.renameGroupChat(body)

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

      const result = await chatService.addToGroupChat(body)

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

      const result = await chatService.removeFromGroupChat(body)

      const message = 'Success remove user from group chat'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }
}

export const { getChats, accessChat, createGroupChat, renameGroup, addToGroup, removeFromGroup } = new ChatController()
