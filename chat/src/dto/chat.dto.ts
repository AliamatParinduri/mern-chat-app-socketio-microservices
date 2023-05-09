/* eslint-disable prefer-regex-literals */
import Joi from 'joi'
import { Document } from 'mongoose'

import { MessageDTO, UserDTO } from '.'

export interface ChatDTO extends Document {
  chatName: string
  isGroupChat: boolean
  users: [UserDTO]
  latestMessage: MessageDTO
  groupAdmin: [UserDTO]
}

export interface RenameGroupChatDTO extends Document {
  chatId: string
  chatName: string
}

export interface AddOrRemoveGroupChatDTO extends Document {
  chatId: string
  userId: string
}

export const AccessChatSchema = Joi.object({
  userId: Joi.string().alphanum().required()
})

export const CreateGroupChatSchema = Joi.object({
  name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,75}$')).required(),
  users: Joi.string()
})

export const RenameGroupChatSchema = Joi.object({
  chatId: Joi.string().alphanum().required(),
  chatName: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,75}$')).required()
})

export const AddOrRemoveGroupChatSchema = Joi.object({
  chatId: Joi.string().alphanum().required(),
  userId: Joi.string().alphanum().required()
})
