import { Document } from 'mongoose'

import { ChatDTO, UserDTO } from '.'
import Joi from 'joi'

export interface MessageDTO extends Document {
  sender: UserDTO
  content: string
  chat: ChatDTO
}

export interface sendMessageDTO extends Document {
  sender: string
  content: string
  chat: string
}

export const sendMessageSchema = Joi.object({
  content: Joi.string().required(),
  chatId: Joi.string().required()
})
