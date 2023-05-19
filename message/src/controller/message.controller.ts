import { NextFunction, Request, Response } from 'express'

import { RPCObserver, logger, validate } from '../utils'
import { sendMessageDTO, sendMessageSchema } from '../dto'
import MessageService from '../services/message.service'

class MessageController {
  channel
  service = new MessageService()

  constructor(channel: any) {
    this.channel = channel
    RPCObserver(channel, this.service)
  }

  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body

      validate(body, sendMessageSchema)

      const newMessage = {
        sender: res.locals.user._id,
        content: body.content,
        chat: body.chatId
      }

      const result = await this.service.sendMessage(this.channel, newMessage as sendMessageDTO)

      const message = 'Success send message'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err) {
      next(err)
    }
  }

  getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getMessages(this.channel, req.params.chatId)

      const message = 'Success get all messages'
      logger.info(message)
      return res.status(200).json({ message, data: result })
    } catch (err) {
      next(err)
    }
  }
}

export default MessageController
