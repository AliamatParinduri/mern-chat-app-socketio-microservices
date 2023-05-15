import { NextFunction, Request, Response } from 'express'

import { logger, validate } from '../utils'
import { sendMessageDTO, sendMessageSchema } from '../dto'
import { messageService } from '../services'

class MessageController {
  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = res.locals.userToken
      const body = req.body

      validate(body, sendMessageSchema)

      const newMessage = {
        sender: res.locals.user._id,
        content: body.content,
        chat: body.chatId
      }

      const result = await messageService.sendMessage(newMessage as sendMessageDTO, token)

      const message = 'Success send message'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err) {
      next(err)
    }
  }

  getLastestMessageById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id

      const result = await messageService.getLastestMessageById(id)

      const message = 'Success get chat data by id'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err: any) {
      next(err)
    }
  }

  getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = res.locals.userToken
      const result = await messageService.getMessages(req.params.chatId, token)

      const message = 'Success get all messages'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err) {
      next(err)
    }
  }
}

export const { sendMessage, getLastestMessageById, getMessages } = new MessageController()
