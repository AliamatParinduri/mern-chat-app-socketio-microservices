import { NextFunction, Request, Response } from 'express'

import { logger, validate } from '../utils'
import { sendMessageDTO, sendMessageSchema } from '../dto'
import { messageService } from '../services'

class MessageController {
  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body

      validate(body, sendMessageSchema)

      const newMessage = {
        sender: res.locals.user._id,
        content: body.content,
        chat: body.chatId
      }

      const result = await messageService.sendMessage(newMessage as sendMessageDTO)

      const message = 'Success send message'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err) {
      next(err)
    }
  }

  getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await messageService.getMessages(req.params.chatId)

      const message = 'Success get all messages'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err) {
      next(err)
    }
  }
}

export const { sendMessage, getMessages } = new MessageController()
