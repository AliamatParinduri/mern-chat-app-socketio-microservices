import Joi from 'joi'
import { Document } from 'mongoose'

import { LoginValidate } from './auth.dto'

export interface UserDTO extends Document {
  name: string
  email: string
  password: string
  pic: string
}

export const UserValidate = Joi.object({
  ...LoginValidate,
  name: Joi.string().required(),
  pic: Joi.string().required()
})
